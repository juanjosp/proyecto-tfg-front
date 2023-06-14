import React, { useEffect, useState } from 'react';
import { getAll, obtenerProfesorPorEmail } from '../services/api';
import '../index.css';

function Horarios() {
  const [profesorId, setProfesorId] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 6;

  const fetchHorarios = async () => {
    try {
      const data = await getAll('horarios');
      const filteredHorarios = data.filter(
        (horario) => horario.profesor && horario.profesor.id === profesorId,
      );

      setHorarios(filteredHorarios);
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  useEffect(() => {
    const fetchProfesorId = async () => {
      try {
        const email = localStorage.getItem('profesorId');
        // Realizar la lógica para obtener el ID del profesor
        // a partir del correo electrónico en localStorage
        const response = await obtenerProfesorPorEmail(email);
        if (response && response.id) {
          setProfesorId(response.id);
        }
      } catch (error) {
        console.error(error);
        // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
      }
    };

    fetchProfesorId();
  }, []);
  useEffect(() => {
    if (profesorId) {
      fetchHorarios();
    }
  }, [profesorId]);
  const numeroPaginas = Math.ceil(horarios.length / elementosPorPagina);
  const elementosPaginaActual = horarios.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina,
  );

  function handlePaginaSiguiente() {
    setPaginaActual(paginaActual + 1);
  }

  function handlePaginaAnterior() {
    setPaginaActual(paginaActual - 1);
  }
  const renderHorarios = () => {
    if (horarios.length === 0) {
      return <p>No hay horarios disponibles.</p>;
    }

    return (
      <div className="table-responsive">
        <table id="tabla-profesores" className="table mt-4">
          <thead className="tabla-general">
            <tr>
              <th>Fecha</th>
              <th>Hora de Inicio</th>
              <th>Hora de Fin</th>
              <th>Aula</th>
              <th>Asignatura</th>
              <th>Profesor</th>
            </tr>
          </thead>
          <tbody>
            {elementosPaginaActual.map((horario) => (
              <tr key={horario.id}>
                <td>{horario.fecha}</td>
                <td>{horario.horaInicio}</td>
                <td>{horario.horaFin}</td>
                <td>{horario.aula.nombre}</td>
                <td>{horario.asignatura.nombre}</td>
                <td>{horario.profesor.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {numeroPaginas > 1 && (
          <div className="paginacion-div">
            <ul className="pagination m-auto m-1">
              <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={handlePaginaAnterior}>
                  Anterior
                </button>
              </li>

              {[...Array(5)].map((e, i) => {
                let pagina;
                switch (i) {
                  case 0:
                    pagina = paginaActual - 1;
                    break;
                  case 1:
                    pagina = paginaActual;
                    break;
                  case 2:
                    pagina = paginaActual + 1;
                    break;

                  default:
                    pagina = 0;
                }
                if (pagina < 1 || pagina > numeroPaginas) {
                  return null;
                }
                return (
                  <li className={`page-item ${paginaActual === pagina ? 'active' : ''}`}>
                    <button type="button" className="page-link" onClick={() => setPaginaActual(pagina)}>
                      {pagina}
                    </button>
                  </li>
                );
              })}

              <li className={`page-item ${paginaActual === numeroPaginas || elementosPaginaActual.length < elementosPorPagina ? 'disabled' : ''}`}>

                <button type="button" className="page-link" onClick={handlePaginaSiguiente}>
                  Siguiente
                </button>
              </li>

              <li className="page-item disabled ml-auto2">
                <span className="page-link">
                  Página
                  {' '}
                  {paginaActual}
                  {' '}
                  de
                  {' '}
                  {numeroPaginas}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

    );
  };

  return (
    <div className="container text-center mt-5">
      <h2>Horarios</h2>
      {renderHorarios()}
    </div>
  );
}

export default Horarios;
