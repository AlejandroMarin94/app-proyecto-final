const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/authToken');

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

const signup = async (req, res) => {
  try {
    console.log("Body recibido en signup:", req.body);
    const { name, lastName, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(200)
        .send({ status: "Failed", message: "El email ya está en uso" });
    }

    const newUser = {
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS),
    };  
    const user = await userModel.create(newUser);
    if (!user) {
      return res
        .status(400)
        .send({ status: "Failed", message: "No se ha creado el usuario" });
    }
    res.status(200).send({
      status: "Success",
      message: "El usuario se ha creado correctamente",
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body recibido", req.body);

    const user = await userModel
      .findOne({ email: email })
      .select("name lastName age email password role isActive -_id");
    console.log("Usuario encontrado:", user.password);

    if (!user) {
      return res
        .status(404)
        .send({
          status: "Failed",
          message: "Credenciales introducidas incorrectas",
        });
    }
    console.log(password, user.password);
    const validatePassword = await bcrypt.compare(password, user.password);
    console.log("2");
    if (!validatePassword) {
      return res
        .status(404)
        .send({
          status: "Failed",
          message: "Credenciales introducidas incorrectas",
        });
    }

    if (!user.isActive) {
      console.log("No pasas");
      return res
        .status(200)
        .send({
          status: "Failed",
          message:
            "Su cuenta ha sido desactivada, contacte con soporte técnico",
        });
    }

    const returnUser = {
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };

    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    }

    const token = generateToken(payload, false);
    const refreshToken = generateToken(payload, true);
    res.status(200).send({ status: "Success", userData: returnUser, token, refreshToken });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const loginWithToken = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const user = await userModel
      .findById(idUser)
      .select('name lastName email role -_id');
    if (!user)
      return res
        .status(401)
        .send({ status: 'Failed', message: 'No se ha encontrado ese usuario' });
    res.status(200).send({ status: 'Success', data: user });
  } catch (error) {
    res.status(500).send({ status: 'Failed', error: error.message });
  }
};

const updatePrincipalToken = (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    };

    const token = generateToken(payload, false);
   
    res.status(200).send({ status: 'Success', token });
  } catch (error) {
    res.status(500).send({ status: 'Failed', error: error.message });
  }
};

module.exports = {
  signup,
  login,
  loginWithToken,
  updatePrincipalToken,
};