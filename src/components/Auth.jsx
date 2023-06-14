/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Evitar envío automático del formulario

    try {
      const response = await login(username, password);
      localStorage.setItem('profesorId', username);
      if (response === 'OK') {
        // Autenticación exitosa, redirigir o realizar acciones adicionales
      } else {
        setErrorMessage('Credenciales inválidas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Bienvenido!</h1>
                  </div>
                  <form className="user" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="txtEmail"
                        aria-describedby="emailHelp"
                        placeholder="Introduzca el Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="txtPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit" // Cambiado a tipo "submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </form>
                  {errorMessage && (
                    <p className="text-danger text-center mt-2">{errorMessage}</p>
                  )}
                  <div className="text-center">
                    <Link to="/registrar">Crear una cuenta!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
