export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter((d) => d.name === day)[0];

  if (!selectedDay) {
    return [];
  }

  const appointmentsForDay = selectedDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter((i) => i.name === day)[0];

  if (!selectedDay) {
    return [];
  }

  const interviewersForDay = selectedDay.interviewers.map(
    (interviewId) => state.interviewers[interviewId]
  );

  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewer || null
  };
}

