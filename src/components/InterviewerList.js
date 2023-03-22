import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props){
    const {interviewers, interviewer, setInterviewer} = props;

    const interviewItems = interviewers.map((interviewObj) => 
         <InterviewerListItem
          key={interviewObj.id}
          id={interviewObj.id}
          name={interviewObj.name}
          avatar={interviewObj.avatar}
          selected={interviewObj.id === interviewer}
          setInterviewer={(event) => setInterviewer(interviewObj.id)}
          />
)

    return (
        <section className="interviewers">
        <h4 className="interviewers__header text--light">interviewers</h4>
        <ul className="interviewers__list">
        {interviewItems}
        </ul>
      </section>
    );
  }


