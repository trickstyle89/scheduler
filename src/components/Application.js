import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    const dayURL = `http://localhost:8001/api/days`;
    const appointmentURL= `http://localhost:8001/api/appointments`;
    const interviewerURL= `http://localhost:8001/api/interviewers`;
    
    Promise.all([axios.get(dayURL), axios.get(appointmentURL), axios.get(interviewerURL) ] )
      .then((all) => {
        setState(prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  console.log(state.interviewers);

  const dailyAppointments = getAppointmentsForDay(state, state.day);


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day} //{days} selectedDay
            setDay={setDay} // onChange
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
