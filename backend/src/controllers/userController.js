const userModel = require('../models/userModel');

const deleteUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res
      .status(200)
      .send({ status: "Success", message: "Usuario elimnado correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};



const editUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const newUser = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Success", data: updatedUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await userModel.findById(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  deleteUserById,
  editUserById,
  getUserById
};