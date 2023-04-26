import { useState, useEffect } from "react";
import axios from "axios";
// import axios from "__mocks__ /axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = function(state, appointments, id) {
    //find the correct day with the appt id 
    const day = state.days.find(({ appointments }) => appointments.includes(id))
  
    //count the spots for the specific day
    let newSpots = 0;
    day.appointments.forEach(element => {
      if (!appointments[element].interview) {
        newSpots ++;
      }
    });
  
    //create the new days array, with updated spots
    const updatedDays = state.days.map((dayObj) => {
      if(dayObj.id === day.id) {
        return {...dayObj, spots: newSpots};
      } else {
        return dayObj;
      }
    })
  
    // return an updated days array
    return updatedDays

  };


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
        const days = (updateSpots(state, appointments, id))
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
      const days = (updateSpots(state, appointments, id))
      setState({ ...state, appointments, days });
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"), //change url to work with test 
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