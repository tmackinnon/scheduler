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
