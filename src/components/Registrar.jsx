import React from 'react';
import { Link } from 'react-router-dom';
import { create } from '../services/api';

function Registrar() {
  const registraUsuario = async () => {
    const datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;

    const repetirPassword = document.getElementById('txtRepetirPassword').value;
    if (repetirPassword !== datos.password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await create('profesores/registro', datos);
      alert('Usuario registrado exitosamente');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">

            <div className="col-lg-12">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Registrarse</h1>
                </div>
                <form className="user">
                  <div className="form-group row">
                    <div className="col-sm-12 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" id="txtNombre" placeholder="Nombre y Apellidos" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" id="txtEmail" placeholder="Email" />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="password" className="form-control form-control-user" id="txtPassword" placeholder="Password" />
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user" id="txtRepetirPassword" placeholder="Repetir Password" />
                    </div>
                  </div>

                  <button type="button" onClick={registraUsuario} href="#" className="btn btn-primary btn-user btn-block">
                    Registrar usuario
                  </button>
                  <hr />
                </form>
                <hr />
                <div className="text-center">
                  <Link to="/">Ya tienes una cuenta? Inicia sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
