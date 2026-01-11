import React, { useState } from "react";

const LoginCardComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidosChange = (e) => {
    setApellidos(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEdadChange = (e) => {
    setEdad(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, password });
    // Aquí puedes agregar la lógica de login
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register attempt with:", { nombre, apellidos, email, edad });
    // Aquí puedes agregar la lógica de registro
  };

  const handleCreateNew = () => {
    setIsRegister(true);
  };

  const handleBackToLogin = () => {
    setIsRegister(false);
    setNombre("");
    setApellidos("");
    setEmail("");
    setEdad("");
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className={`row g-0 ${isRegister ? 'row-register' : ''}`}>
                
                {/* LEFT SIDE */}
                <div className={`col-lg-6 transition-page ${isRegister ? 'd-flex align-items-center left-section-register' : ''}`}>
                  <div className={`content-transition ${isRegister ? 'text-white px-3 py-4 p-md-5 mx-md-4 w-100' : 'card-body p-md-5 mx-md-4'}`}>
                    {!isRegister ? (
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

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              data-mdb-input-init
                              value={username}
                              onChange={handleUsernameChange}
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
                              value={password}
                              onChange={handlePasswordChange}
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
                            >
                              Log in
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
                <div className={`col-lg-6 transition-page d-flex align-items-center ${isRegister ? '' : 'gradient-custom-2'}`}>
                  <div className="content-transition w-100">
                    {!isRegister ? (
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
                        <form onSubmit={handleRegister}>
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="nombre"
                              className="form-control input-register"
                              data-mdb-input-init
                              value={nombre}
                              onChange={handleNombreChange}
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
                              value={apellidos}
                              onChange={handleApellidosChange}
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
                              value={email}
                              onChange={handleEmailChange}
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
                              value={edad}
                              onChange={handleEdadChange}
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
                            >
                              Registrarse
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