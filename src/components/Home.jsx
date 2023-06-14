import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Archivo CSS para los estilos
import listaImg from '../assets/lista.png';
import profesorImg from '../assets/profesor.png';
import horariosImg from '../assets/horarios.png';

function Dashboard() {
  return (
    <div className="container">
      <h2 className="text-center mt-3">Aplicación Gestión de Guardias</h2>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <Link to="/notificar-ausencia">
            <img src={listaImg} alt="Imagen" />
            <h2>Notificar Ausencia</h2>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/guardia">
            <img src={profesorImg} alt="Imagen" />
            <h2>Selección de Guardia</h2>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/horario">
            <img src={horariosImg} alt="Imagen" />
            <h2>Horario</h2>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
