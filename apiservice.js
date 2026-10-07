// Fase 3: Integración con API externa y manejo de errores HTTP
class ApiService {
  constructor() {
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  // Simulación de autenticación mediante API
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/users/1`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      return { token: 'jwt-token-demo-12345', email };
    } catch (error) {
      throw new Error('Error de conexión o credenciales inválidas.');
    }
  }

  // Consulta de citas simulando petición GET a API
  async fetchAppointments() {
    try {
      const response = await fetch(`${this.baseUrl}/posts?_limit=3`);
      if (!response.ok) throw new Error(`Error en servidor: ${response.status}`);
      
      // Mapeo de respuesta de la API a modelo de Cita Médica
      return [
        { id: 1, doctor: 'Dr. Carlos Mendoza', specialty: 'Cardiología', date: '2026-10-12', time: '09:00', status: 'Confirmada' },
        { id: 2, doctor: 'Dra. Ana Restrepo', specialty: 'Dermatología', date: '2026-10-18', time: '14:30', status: 'Confirmada' },
        { id: 3, doctor: 'Dr. Roberto Gómez', specialty: 'Medicina General', date: '2026-11-02', time: '11:00', status: 'Confirmada' }
      ];
    } catch (error) {
      throw new Error('No se pudieron obtener las citas médicas.');
    }
  }

  // Modificación simulada vía PUT/PATCH
  async updateAppointment(id, newDate, newTime) {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ date: newDate, time: newTime }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (!response.ok) throw new Error('Error al actualizar cita en el servidor.');
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Cancelación simulada vía DELETE
  async cancelAppointment(id) {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al cancelar la cita.');
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const apiService = new ApiService();