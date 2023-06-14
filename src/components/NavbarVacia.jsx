import React from 'react';
import '../index.css';

function NavbarVacia() {
  return (
    <nav className="navbar navbar--bg__rojomarvel p-navbar">
      <div className="container">
        <div className="row">
          <div className="col-lg-9" />
          <div className="col-lg-3">
            <ul className="navbar--ul" />
          </div>
        </div>

      </div>
    </nav>
  );
}

export default NavbarVacia;
