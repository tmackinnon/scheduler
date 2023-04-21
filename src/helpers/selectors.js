export const getAppointmentsForDay = function(state, day) {
  
  //filter the associated day obj
  const dayInfo = state.days.filter(obj => obj.name === day) 

  //return empty array if no day exists
  if (!dayInfo.length) {
    return dayInfo;
  }

  const appointments = dayInfo[0].appointments;
  return appointments.map(id => state.appointments[id]); //return an array of appointment objs
}


export const getInterview = function(state, interview) {
  if (!interview) return null;
  
  const interviewerId = interview.interviewer;
  const interviewers = state.interviewers
  
  for (let key in interviewers) {
    if (interviewerId === interviewers[key].id) {
      return {...interview, interviewer: interviewers[key]}
    }
  }
}
