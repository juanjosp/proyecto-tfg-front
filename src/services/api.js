/* eslint-disable max-len */
const API_URL = 'http://localhost:8080'; // URL de tu servidor API

export const login = async (username, password) => {
  try {
    const datos = {
      email: username,
      password,
    };

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    const respuesta = await response.text();
    if (respuesta === 'OK') {
      window.location.href = '/home';
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getAll = async (resource) => {
  try {
    const response = await fetch(`${API_URL}/${resource}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const create = async (resource, payload) => {
  try {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const update = async (resource, id, payload) => {
  try {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async (resource, id) => {
  try {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};
// ...

export const getById = async (resource, id) => {
  try {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const obtenerProfesorPorEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/profesores/email/${email}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerAsignaturaIdPorNombre = async (nombre) => {
  try {
    const response = await fetch(`${API_URL}/asignaturas/${nombre}/id`);
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const obtenerAulaIdPorNombre = async (nombre) => {
  try {
    const response = await fetch(`${API_URL}/aulas/${nombre}/id`);
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerGuardias = async (profesorId) => {
  try {
    const response = await getAll('guardias');
    const guardias = response.filter((guardia) => guardia.profesor
      && guardia.profesor.id === profesorId);
    return guardias;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const desasignarGuardia = async (guardiaId, fecha, horaInicio, horaFin, asignaturaId, aulaId, horarioId) => {
  try {
    const payload = {
      profesor: null,
      fecha,
      horaInicio,
      horaFin,
      asignatura: { id: asignaturaId },
      aula: { id: aulaId },
      horario: { id: horarioId },
    };
    await update('guardias', guardiaId, payload);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const actualizarHorario = async (horarioId, fecha, horaInicio, horaFin, asignaturaId, aulaId) => {
  try {
    const payload = {
      id: horarioId,
      profesor: null,
      fecha,
      horaInicio,
      horaFin,
      asignatura: { id: asignaturaId },
      aula: { id: aulaId },
    };
    await update('horarios', horarioId, payload);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const actualizarHorarioAsignar = async (horarioId, profesorId, fecha, horaInicio, horaFin, asignaturaId, aulaId) => {
  try {
    const payload = {
      id: horarioId, // Añade el id del horario al payload
      profesor: { id: profesorId },
      fecha,
      horaInicio,
      horaFin,
      asignatura: { id: asignaturaId },
      aula: { id: aulaId },
    };
    await update('horarios', horarioId, payload);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asignarGuardia = async (guardiaId, profesorId, fecha, horaInicio, horaFin, asignaturaId, aulaId, horarioId) => {
  try {
    const payload = {
      profesor: { id: profesorId },
      fecha,
      horaInicio,
      horaFin,
      asignatura: { id: asignaturaId },
      aula: { id: aulaId },
      horario: { id: horarioId },
    };
    await update('guardias', guardiaId, payload);
  } catch (error) {
    throw new Error(error.message);
  }
};
