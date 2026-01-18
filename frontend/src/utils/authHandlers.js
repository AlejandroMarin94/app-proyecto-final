import { signup, login } from "../services/authService";

export const handleLogin = async (e, formData, handlers) => {
  const { setLoading, setError, setSuccess, navigate } = handlers;

  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    await login({
      email: formData.username,
      password: formData.password,
    });

    setSuccess("Inicio de sesión exitoso");

    setTimeout(() => {
      navigate("/homepage");
    }, 1500);
  } catch (err) {
    if (err.type === "AUTH_ERROR") {
      navigate("/login");
      setError("Tu sesión ha expirado. Por favor inicia sesión de nuevo.");
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};

export const handleRegister = async (e, formData, handlers) => {
  const { setFormData, setLoading, setError, setSuccess, navigate } = handlers;

  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  if (formData.passwordRegister !== formData.confirmPassword) {
    setError("Las contraseñas no coinciden");
    setLoading(false);
    return;
  }

  try {
    await signup({
      name: formData.nombre,
      lastName: formData.apellidos,
      email: formData.email,
      password: formData.passwordRegister,
    });

    setSuccess("Registro exitoso. Por favor, inicia sesión");

    setFormData((prevData) => ({
      ...prevData,
      nombre: "",
      apellidos: "",
      email: "",
      passwordRegister: "",
      confirmPassword: "",
      isRegister: false,
      username: "",
      password: "",
    }));
  } catch (err) {
    if (err.type === "AUTH_ERROR") {
      navigate("/login");
      setError("Tu sesión ha expirado. Por favor inicia sesión de nuevo.");
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};
