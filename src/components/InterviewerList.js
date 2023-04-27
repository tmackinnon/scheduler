import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = function(props) {
  const interviewers = props.interviewers;
  const interviewerId = props.value;
  const onChange = props.onChange;

  const interviewerItems = interviewers.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => { onChange(interviewer.id); }}
      selected={interviewer.id === interviewerId}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItems}
      </ul>
    </section>
  );
};


export default InterviewerList;