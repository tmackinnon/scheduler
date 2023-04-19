import React from "react";
import "components/InterviewerListItem.scss"

const InterviewListItem = function(props) {



  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}

export default InterviewListItem;



// id = props.id
// name = props.name
// avatar = props.avatar
// setInterviewe r= props.setInterviewer