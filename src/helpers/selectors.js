export function getAppointmentsForDay(state, day) {
    const selectedDay = state.days.find((d) => d.name === day);
    
    if (!selectedDay) {
      return [];
    }
  
    const appointmentsForDay = selectedDay.appointments.map(
      (appointmentId) => state.appointments[appointmentId]
    );
    
    return appointmentsForDay;
  }