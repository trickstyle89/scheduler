import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode.js";

export default function Appointment(props) {
  const { interview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const deleteInterview = (id) => {
    transition(CONFIRM);
  };
  
  function onConfirmDelete() {
    transition(DELETING);
  
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (

        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => deleteInterview(props.id)}
          onEdit={props.onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(name, interviewer) => {
            const interview = {
              student: name,
              interviewer,
            };
            transition(SAVING);
            props.bookInterview(props.id, interview)
            .then(() => {
              transition(SHOW);
            })
            .catch((error) => {
              console.log("error:", error);
            });
          }}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={() => transition(SHOW)}
          onConfirm={() => onConfirmDelete()}
          />
      )}
    </article>
  );
}