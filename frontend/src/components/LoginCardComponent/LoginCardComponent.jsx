import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../../services/authService";

const LoginCardComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellidos: "",
    email: "",
    edad: "",
    isRegister: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (propName, propValue) => {
    setFormData(prevData => ({
      ...prevData,
      [propName]: propValue
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await login({ 
        email: formData.username, 
        password: formData.password 
      });
      console.log("Login exitoso:", data.userData);
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await signup({
        name: formData.nombre,
        lastName: formData.apellidos,
        email: formData.email,
        password: formData.password,
      });
      
      setSuccess("Registro exitoso. Por favor, inicia sesión");
      
      setFormData(prevData => ({
        ...prevData,
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        isRegister: false,
        username: "",
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    handleInputChange("isRegister", true);
  };

  const handleBackToLogin = () => {
    handleInputChange("isRegister", false);
    setFormData(prevData => ({
      ...prevData,
      nombre: "",
      apellidos: "",
      email: "",
      edad: "",
    }));
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className={`row g-0 ${formData.isRegister ? 'row-register' : ''}`}>
                
                {/* LEFT SIDE */}
                <div className={`col-lg-6 transition-page ${formData.isRegister ? 'd-flex align-items-center left-section-register' : ''}`}>
                  <div className={`content-transition ${formData.isRegister ? 'text-white px-3 py-4 p-md-5 mx-md-4 w-100' : 'card-body p-md-5 mx-md-4'}`}>
                    {!formData.isRegister ? (
                      <>
                        <div className="text-center">
                          <img
                            src="/Libro Abierto Para Colorear.jpeg"
                            className="logo-login"
                            alt="logo"
                          />
                          <h4 className="mt-1 mb-5 pb-1 title-rounded">LIBROPIA</h4>
                        </div>

                        <form onSubmit={handleLogin}>
                          <p>Please login to your account</p>

                          {error && <div className="alert alert-danger">{error}</div>}
                          {success && <div className="alert alert-success">{success}</div>}

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              data-mdb-input-init
                              value={formData.username}
                              onChange={(e) => handleInputChange("username", e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form2Example11">
                              Username
                            </label>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                              data-mdb-input-init
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form2Example22">
                              Password
                            </label>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Cargando..." : "Log in"}
                            </button>
                            <a className="text-muted" href="#!">
                              Forgot password?
                            </a>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-outline-gradient"
                              onClick={handleCreateNew}
                            >
                              Create new
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="quote-section">
                        <p className="quote-main">
                          "Las personas libres jamás podrán concebir lo que los libros significan para quienes vivimos encerrados."
                        </p>
                        <p className="quote-author">
                          - Ana Frank
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className={`col-lg-6 transition-page d-flex align-items-center ${formData.isRegister ? '' : 'gradient-custom-2'}`}>
                  <div className="content-transition w-100">
                    {!formData.isRegister ? (
                      <div className="quote-section">
                        <p className="quote-main">
                          "Las personas libres jamás podrán concebir lo que los libros significan para quienes vivimos encerrados."
                        </p>
                        <p className="quote-author">
                          - Ana Frank
                        </p>
                      </div>
                    ) : (
                      <div className="px-2 py-3 p-md-3 mx-md-2 w-100">
                        <div className="text-center">
                          <img
                            src="/Libro Abierto Para Colorear.jpeg"
                            className="logo-register"
                            alt="logo"
                          />
                          <h5 className="mt-2 mb-3 pb-0 title-rounded text-black title-register">LIBROPIA</h5>
                        </div>
                        <h6 className="mb-3 text-black subtitle-register">Crear cuenta</h6>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={handleRegister}>
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="nombre"
                              className="form-control input-register"
                              data-mdb-input-init
                              value={formData.nombre}
                              onChange={(e) => handleInputChange("nombre", e.target.value)}
                              required
                            />
                            <label className="form-label label-register" htmlFor="nombre">
                              Nombre
                            </label>
                          </div>

                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="apellidos"
                              className="form-control input-register"
                              data-mdb-input-init
                              value={formData.apellidos}
                              onChange={(e) => handleInputChange("apellidos", e.target.value)}
                              required
                            />
                            <label className="form-label label-register" htmlFor="apellidos">
                              Apellidos
                            </label>
                          </div>

                          <div className="form-outline mb-2">
                            <input
                              type="email"
                              id="email"
                              className="form-control input-register"
                              data-mdb-input-init
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                            <label className="form-label label-register" htmlFor="email">
                              Email
                            </label>
                          </div>

                          <div className="form-outline mb-2">
                            <input
                              type="number"
                              id="edad"
                              className="form-control input-register"
                              data-mdb-input-init
                              value={formData.edad}
                              onChange={(e) => handleInputChange("edad", e.target.value)}
                            />
                            <label className="form-label label-register" htmlFor="edad">
                              Edad
                            </label>
                          </div>

                          <div className="text-center pt-1 mb-2 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 btn-register-submit"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Registrando..." : "Registrarse"}
                            </button>
                          </div>

                          <div className="text-center">
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-outline-gradient btn-sm btn-register-back"
                              onClick={handleBackToLogin}
                            >
                              Volver al login
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

 


export default LoginCardComponent