// En js/app.js

class AppController {
  constructor() {
    // Escucha cambios de estado para actualizar la interfaz
    appStore.subscribe(state => ui.renderView(state));
  }

  async init() {
    const state = appStore.getState();
    if (state.user) {
      await this.loadAppointments();
    }
  }

  async login(email, password) {
    try {
      const user = await apiService.login(email, password);
      appStore.setUser(user);
      await this.loadAppointments();
      ui.showAlert('Sesión iniciada con éxito.', 'success');
    } catch (err) {
      ui.showAlert(err.message, 'error');
    }
  }

  logout() {
    appStore.setUser(null);
  }

  async loadAppointments() {
    try {
      const appointments = await apiService.fetchAppointments();
      appStore.setAppointments(appointments);
    } catch (err) {
      ui.showAlert(err.message, 'error');
    }
  }

  openRescheduleModal(id) {
    const app = appStore.getState().appointments.find(a => a.id === id);
    if (!app) return;

    document.getElementById('modal-appointment-id').value = id;
    document.getElementById('modal-appointment-info').textContent = `${app.doctor} (${app.specialty})`;
    document.getElementById('new-date').value = app.date;
    document.getElementById('new-time').value = app.time;
    ui.toggleModal(true);
  }

  async confirmReschedule(id, newDate, newTime) {
    try {
      await apiService.updateAppointment(id, newDate, newTime);
      appStore.updateAppointment(id, newDate, newTime);
      ui.toggleModal(false);
      ui.showAlert('Cita reagendada con éxito.', 'success');
    } catch (err) {
      ui.showAlert(err.message, 'error');
    }
  }

  async cancelAppointment(id) {
    if (!confirm('¿Estás seguro de cancelar esta cita médica?')) return;
    try {
      await apiService.cancelAppointment(id);
      appStore.removeAppointment(id);
      ui.showAlert('Cita cancelada correctamente.', 'success');
    } catch (err) {
      ui.showAlert(err.message, 'error');
    }
  }
}

// Instancia global de appController
const appController = new AppController();

document.addEventListener('DOMContentLoaded', () => {
  appController.init();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!email || !password) {
        ui.showAlert('Por favor, ingresa correo y contraseña.', 'error');
        return;
      }

      appController.login(email, password);
    });
  }

  // Event listener para cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => appController.logout());
  }
});