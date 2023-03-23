import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props){
  const { interview } = props;

    return (
      <article className="appointment">
      <Header time={props.time}/>
      {interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      ) : (
        <Empty  onAdd={props.onAdd} />  
      )}
      </article>
      
    );
  }