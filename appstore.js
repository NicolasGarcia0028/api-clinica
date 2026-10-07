// Fase 2 & 3: Manejo de Estado Centralizado y Persistencia
class AppStore {
  constructor() {
    this.state = {
      user: JSON.parse(localStorage.getItem('medical_user')) || null,
      appointments: [],
      loading: false,
      error: null
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  setUser(user) {
    this.state.user = user;
    if (user) {
      localStorage.setItem('medical_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medical_user');
    }
    this.notify();
  }

  setAppointments(appointments) {
    this.state.appointments = appointments;
    this.notify();
  }

  updateAppointment(id, date, time) {
    this.state.appointments = this.state.appointments.map(app => 
      app.id === id ? { ...app, date, time } : app
    );
    this.notify();
  }

  removeAppointment(id) {
    this.state.appointments = this.state.appointments.filter(app => app.id !== id);
    this.notify();
  }
}

const appStore = new AppStore();