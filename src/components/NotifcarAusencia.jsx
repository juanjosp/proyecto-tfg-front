/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  create,
  obtenerProfesorPorEmail,
  obtenerAsignaturaIdPorNombre,
  obtenerAulaIdPorNombre,
} from '../services/api';
import '../index.css';

function NotificarAusencia() {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [asignaturaNombre, setAsignaturaNombre] = useState('');
  const [aulaNombre, setAulaNombre] = useState('');
  const [profesorId, setProfesorId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfesorId = async () => {
      try {
        const email = localStorage.getItem('profesorId');
        const response = await obtenerProfesorPorEmail(email);
        if (response && response.id) {
          setProfesorId(response.id);
        }
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error(error);
        // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
      }
    };

    fetchProfesorId();
  }, []);

  const handleNotificarAusencia = async (e) => {
    e.preventDefault();

    try {
      // Obtener la ID de la asignatura y el aula a partir de los nombres
      const asignaturaId = await obtenerAsignaturaIdPorNombre(asignaturaNombre);
      const asignaturaId2 = 5;
      const aulaId = await obtenerAulaIdPorNombre(aulaNombre);

      if (!asignaturaId || !aulaId) {
        setError('El nombre de la asignatura o el aula no existe');
        return;
      }

      const nuevaAusencia = {
        fecha,
        horaInicio,
        horaFin,
        asignatura: { id: asignaturaId },
        aula: { id: aulaId },
        profesor: { id: profesorId },
      };

      await create('ausencias', nuevaAusencia);
      const nuevoHorario = {
        fecha,
        horaInicio,
        horaFin,
        asignatura: { id: asignaturaId2 },
        aula: { id: aulaId },
        profesor: null,
      };
      const horarioCreado = await create('horarios', nuevoHorario);
      const horarioId = horarioCreado.id;

      const nuevaGuardia = {
        fecha,
        horaInicio,
        horaFin,
        asignatura: { id: asignaturaId },
        aula: { id: aulaId },
        profesor: null,
        ausencia: { id: aulaId },
        horario: { id: horarioId },
      };

      await create('guardias', nuevaGuardia);

      // Limpiar los campos después de la notificación exitosa
      setFecha('');
      setHoraInicio('');
      setHoraFin('');
      setAsignaturaNombre('');
      setAulaNombre('');

      // Mostrar una notificación o realizar alguna acción adicional si es necesario
      alert('Notificación de ausencia enviada correctamente');
    } catch (error) {
      alert('Nombre de aula o asignatura incorrecto');
      // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Notificar Ausencia</h2>
      <form onSubmit={handleNotificarAusencia}>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="fecha">Fecha:</label>
          <input type="text" placeholder="0000-00-00" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div>
          <label htmlFor="horaInicio">Hora de inicio:</label>
          <input
            type="text"
            id="horaInicio"
            placeholder="00:00:00"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="horaFin">Hora de fin:</label>
          <input type="text" id="horaFin" placeholder="00:00:00" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        </div>
        <div>
          <label htmlFor="asignaturaNombre">Nombre de asignatura:</label>
          <input
            type="text"
            id="asignaturaNombre"
            placeholder="DWEC"
            value={asignaturaNombre}
            onChange={(e) => setAsignaturaNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="aulaNombre">Nombre de aula:</label>
          <input type="text" id="aulaNombre" placeholder="Aula 101" value={aulaNombre} onChange={(e) => setAulaNombre(e.target.value)} />
        </div>
        <button type="submit">Notificar Ausencia</button>
      </form>
    </div>
  );
}

export default NotificarAusencia;
