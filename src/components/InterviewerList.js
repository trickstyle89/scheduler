import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";


function InterviewerList(props){

    const {interviewers = [], value, onChange} = props;

    //weird ability to have pass without RETURN or curly brackets.
    const interviewItems = interviewers.map((interviewObj) => {

        return <InterviewerListItem
          key={interviewObj.id}
          id={interviewObj.id}
          name={interviewObj.name}
          avatar={interviewObj.avatar}
          selected={interviewObj.id === value}
          setInterviewer={(event) => onChange(interviewObj.id)}
          />
})

    return (
        <section className="interviewers">
        <h4 className="interviewers__header text--light">interviewers</h4>
        <ul className="interviewers__list">
        {interviewItems}
        </ul>
      </section>
      
    );
  }

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  export default InterviewerList;

