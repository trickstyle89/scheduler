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

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((i) => i.name === day);

  if (!selectedDay) {
    return [];
  }

  const interviewersForDay = selectedDay.interviewers.map(
    (interviewId) => state.interviewers[interviewId] //.interview && state.interviewers[state.appointments[interviewId].interview.interviewer]
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

