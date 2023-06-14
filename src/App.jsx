import React, { useState, useEffect } from 'react';
import {
  Outlet, Route, Routes, useNavigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Error from './components/Error';
import Login from './components/Auth';
import NotificarAusencia from './components/NotifcarAusencia';
import Guardias from './components/Guardias';
import Registrar from './components/Registrar';
import Home from './components/Home';
import Horario from './components/Horario';
import NavbarVacia from './components/NavbarVacia';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existeLocalStorage = localStorage.getItem('profesorId');
    setIsLoggedIn(!!existeLocalStorage); // Convertir el valor a booleano
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('profesorId');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      {isLoggedIn ? <Navbar onLogout={handleLogout} /> : <NavbarVacia />}
      <Outlet />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notificar-ausencia" element={<NotificarAusencia />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/guardia" element={<Guardias />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
