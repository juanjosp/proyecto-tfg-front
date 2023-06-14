import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../index.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profesorId');
    navigate('/');
    window.location.reload(); // Recargar la página después de iniciar sesión correctamente
  };

  return (
    <nav className="navbar navbar--bg__rojomarvel">
      <div className="container">
        <div className="row">
          <div className="col-lg-7" />
          <div className="col-lg-5">
            <ul className="navbar--ul">
              <li className="navbar--li">
                <NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/Home">
                  Home
                </NavLink>
              </li>
              <li className="navbar--li">
                <NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/notificar-ausencia">
                  N.Ausencia
                </NavLink>
              </li>
              <li className="navbar--li">
                <NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/guardia">
                  Guardias
                </NavLink>
              </li>
              <li className="navbar--li">
                <NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/horario">
                  Horarios
                </NavLink>
              </li>
              <li className="navbar--li">
                <NavLink
                  className="navbar--navlink btn border navbar--btn mx-2 my-2"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
