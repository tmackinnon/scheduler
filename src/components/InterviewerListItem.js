import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = function(props) {
  const name = props.name;
  const avatar = props.avatar;

  const intItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      className={intItemClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && name}
    </li>
  );
};

export default InterviewerListItem;



// id = props.id
// name = props.name
// avatar = props.avatar
// setInterviewe r= props.setInterviewer