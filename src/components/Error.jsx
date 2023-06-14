import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

function Error() {
  return (
    <div className="div">
      <div className="row mt-5">
        <div className="col-5"> </div>
        <div className="col-7  ">
          <h1 className="font--404 ">404 </h1>
          <h1 className="font--error "> Página no encontrada</h1>
          <p>La página a la que está intentando acceder no existe.</p>
          <p>
            Para volver a inicio pulse
            {' '}
            <NavLink className="link-cards" to="/">Aquí</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
