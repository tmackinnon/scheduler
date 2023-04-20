import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss"

const Appointment = function(props) {
  const interview = props.interview;

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
  );
}

export default Appointment;