import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode.js";

export default function Appointment(props) {
  const { interview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (

        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={back}
          onSave={() => {
            transition(SAVING);
          }}
        />
        )}
    </article>
  );
}