import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
    });

    const setDay = (day) => {
        setState({ ...state, day });
    };

    const updateSpots = function (state, appointments, id) {
        const dayObj = state.days.find((d) => d.name === state.day);

        let spots = 0;

        for (const id of dayObj.appointments) {
            if (!appointments[id].interview && !appointments[id].interview) {
                spots++;
            }
        }

        const day = { ...dayObj, spots };

        return state.days.map((d) => (d.name !== state.day ? d : day));
    };

    function bookInterview(id, interview) {
        
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };

        const days = updateSpots(state, appointments, id);

        return axios
            .put(`/api/appointments/${id}`, { interview })
            .then(() => {
                setState({
                    ...state,
                    appointments,
                    days,
                });
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    function cancelInterview(id) {
        
        const appointment = {
            ...state.appointments[id],
            interview: null,
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };

        const days = updateSpots(state, appointments, id);

        return axios
            .delete(`/api/appointments/${id}`)
            .then(() => {
                setState({
                    ...state,
                    appointments,
                    days,
                });
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    useEffect(() => {
        const dayURL = `/api/days`;
        const appointmentURL = `/api/appointments`;
        const interviewerURL = `/api/interviewers`;

        Promise.all([
            axios.get(dayURL),
            axios.get(appointmentURL),
            axios.get(interviewerURL),
        ]).then((all) => {
            setState((prevState) => ({
                ...prevState,
                days: all[0].data,
                appointments: all[1].data,
                interviewers: all[2].data,
            }));
        });
    }, []);

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
    };
}
