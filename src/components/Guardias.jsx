/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  obtenerGuardias,
  desasignarGuardia,
  asignarGuardia,
  obtenerProfesorPorEmail,
  actualizarHorario,
  getAll,
  actualizarHorarioAsignar,
} from '../services/api';
import '../index.css';

function Guardias() {
  const [guardias, setGuardias] = useState([]);
  const [profesorId, setProfesorId] = useState(null);
  const [guardiasDisponibles, setGuardiasDisponibles] = useState([]);

  useEffect(() => {
    const fetchProfesorId = async () => {
      try {
        const email = localStorage.getItem('profesorId');
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
    const fetchGuardias = async () => {
      try {
        // Obtener las guardias asociadas al profesor
        const data = await obtenerGuardias(profesorId);
        setGuardias(data);
        const data2 = await getAll('guardias');
        console.log(data2);
        // Filtrar las guardias disponibles para asignar
        const guardiasDisponibles2 = data2.filter(
          (guardia) => guardia.profesor === null,
        );
        setGuardiasDisponibles(guardiasDisponibles2);
      } catch (error) {
        console.error(error);
        // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
      }
    };

    if (profesorId) {
      fetchGuardias();
    }
  }, [profesorId]);

  const fetchData = async () => {
    try {
      const data = await obtenerGuardias(profesorId);
      setGuardias(data);
      const data2 = await getAll('guardias');
      const guardiasDisponibles2 = data2.filter(
        (guardia) => guardia.profesor === null,
      );
      setGuardiasDisponibles(guardiasDisponibles2);
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  const handleDesasignarGuardia = async (guardiaId, fecha, horaInicio, horaFin, asignaturaId, aulaId, horarioId) => {
    try {
      await desasignarGuardia(guardiaId, fecha, horaInicio, horaFin, asignaturaId, aulaId, horarioId);
      await actualizarHorario(horarioId, fecha, horaInicio, horaFin, asignaturaId, aulaId);
      const updatedGuardias = guardias.map((guardia) => {
        if (guardia.id === guardiaId) {
          return { ...guardia, profesor: null };
        }
        return guardia;
      });
      setGuardias(updatedGuardias);
      fetchData(); // Actualizar los datos después de desasignar la guardia
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  const handleAsignarGuardia = async (guardiaId, fecha, horaInicio, horaFin, asignaturaId, aulaId, horarioId) => {
    try {
      await asignarGuardia(guardiaId, profesorId, fecha, horaInicio, horaFin, 5, aulaId, horarioId);
      await actualizarHorarioAsignar(horarioId, profesorId, fecha, horaInicio, horaFin, 5, aulaId);
      const updatedGuardias = guardias.map((guardia) => {
        if (guardia.id === null) {
          return { ...guardia, profesor: { id: profesorId } };
        }
        return guardia;
      });
      setGuardias(updatedGuardias);
      fetchData(); // Actualizar los datos después de asignar la guardia
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  const renderGuardias = () => {
    if (guardias.length === 0) {
      const frase = 'No hay guardias asignadas.';
      return <h4 className="text-center mt-5">{frase}</h4>;
    }

    return (
      <div className="table-responsive container text-center mt-5">
        <h3>Mis Guardias</h3>

        <table id="tabla-profesores" className="table mt-4">
          <thead className="tabla-general">
            <tr>
              <th>Fecha</th>
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Asignatura</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {guardias.map((guardia) => (
              <tr key={guardia.id}>
                <td>{guardia.fecha}</td>
                <td>{guardia.horaInicio}</td>
                <td>{guardia.horaFin}</td>
                <td>{guardia.asignatura.nombre}</td>
                <td>
                  {guardia.profesor && guardia.profesor.id === profesorId ? (
                    <button type="button" onClick={() => handleDesasignarGuardia(guardia.id, guardia.fecha, guardia.horaInicio, guardia.horaFin, guardia.asignatura.id, guardia.aula.id, guardia.horario.id)}>
                      Desasignar
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGuardiasDisponibles = () => {
    if (guardiasDisponibles.length === 0) {
      return '';
    }

    return (
      <div className="table-responsive container text-center mt-5">
        <h3>Guardias Disponibles</h3>

        <table id="tabla-profesores" className="table mt-4">
          <thead className="tabla-general">
            <tr>
              <th>Fecha</th>
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Asignatura</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {guardiasDisponibles.map((guardia) => (
              <tr key={guardia.id}>
                <td>{guardia.fecha}</td>
                <td>{guardia.horaInicio}</td>
                <td>{guardia.horaFin}</td>
                <td>{guardia.asignatura.nombre}</td>
                <td>
                  <button type="button" onClick={() => handleAsignarGuardia(guardia.id, guardia.fecha, guardia.horaInicio, guardia.horaFin, 5, guardia.aula.id, guardia.horario.id)}>
                    Asignar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderGuardias()}
      {renderGuardiasDisponibles()}
    </div>
  );
}

export default Guardias;
