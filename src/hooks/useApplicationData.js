import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = (id, interview = false)  => {
    //function to remove or add spot when you book or cancel
    //only booking appt will have an interview argument
    const newDays = [...state.days]
    
    newDays.forEach((day, index) => { 
      let spots = day.spots;
      if (day.appointments.includes(id)) {
        //add or remove a spot
        interview ? spots -- : spots ++;
        //update the array with the updated day object
        newDays[index] = {...day, spots}
      } 
    });
    return newDays
  }



  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = (updateSpots(id, interview))
        setState({ ...state, appointments, days });
      })
  }

  function cancelInterview(id) {
    //takes in appt id from index.js
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      const days = (updateSpots(id))
      setState({ ...state, appointments, days });
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch(error => console.log(error));
  }, []);



  return {state, setDay, bookInterview, cancelInterview}

}

export default useApplicationData;