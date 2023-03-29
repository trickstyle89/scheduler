import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = (day) => {
        setState({ ...state, day });
    };

    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        return axios
            .put(`/api/appointments/${id}`, { interview })
            .then(() => {

                const appointments = {
                    ...state.appointments,
                    [id]: appointment
                };

                setState({
                    ...state,
                    appointments
                });
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };

        return axios.delete(`/api/appointments/${id}`)
            .then(() => {

                const appointments = {
                    ...state.appointments,
                    [id]: appointment
                };

                setState({
                    ...state,
                    appointments
                });
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    useEffect(() => {
        const dayURL = `http://localhost:8001/api/days`;
        const appointmentURL = `http://localhost:8001/api/appointments`;
        const interviewerURL = `http://localhost:8001/api/interviewers`;

        Promise.all([axios.get(dayURL), axios.get(appointmentURL), axios.get(interviewerURL)])
            .then((all) => {
                setState(prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
            });
    }, []);

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
      };
    }