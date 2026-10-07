// Fase 1 & 3: Flujos de Interacción con la Interfaz
class UI {
  constructor() {
    this.loginView = document.getElementById('login-view');
    this.dashboardView = document.getElementById('dashboard-view');
    this.userEmailDisplay = document.getElementById('user-email-display');
    this.appointmentsContainer = document.getElementById('appointments-container');
    this.alertBox = document.getElementById('alert-box');
    this.modalReschedule = document.getElementById('modal-reschedule');
  }

  renderView(state) {
    if (state.user) {
      this.loginView.classList.remove('active');
      this.dashboardView.classList.add('active');
      this.userEmailDisplay.textContent = state.user.email;
      this.renderAppointments(state.appointments);
    } else {
      this.dashboardView.classList.remove('active');
      this.loginView.classList.add('active');
    }
  }

  renderAppointments(appointments) {
    this.appointmentsContainer.innerHTML = '';
    
    if (appointments.length === 0) {
      this.appointmentsContainer.innerHTML = '<p>No tienes citas agendadas actualmente.</p>';
      return;
    }

    appointments.forEach(app => {
      const card = document.createElement('div');
      card.className = 'appointment-card';
      card.innerHTML = `
        <div>
          <h4>${app.doctor}</h4>
          <p class="appointment-details"><strong>Especialidad:</strong> ${app.specialty}</p>
          <p class="appointment-details"><strong>Fecha:</strong> ${app.date} - ${app.time}</p>
          <p class="appointment-details"><strong>Estado:</strong> ${app.status}</p>
        </div>
        <div class="card-actions">
          <button class="btn btn-secondary btn-sm" onclick="appController.openRescheduleModal(${app.id})">Reagendar</button>
          <button class="btn btn-danger btn-sm" onclick="appController.cancelAppointment(${app.id})">Cancelar</button>
        </div>
      `;
      this.appointmentsContainer.appendChild(card);
    });
  }

  showAlert(message, type = 'error') {
    this.alertBox.textContent = message;
    this.alertBox.className = `alert alert-${type}`;
    setTimeout(() => {
      this.alertBox.className = 'alert hidden';
    }, 4000);
  }

  toggleModal(show) {
    if (show) this.modalReschedule.classList.remove('hidden');
    else this.modalReschedule.classList.add('hidden');
  }
}

const ui = new UI();