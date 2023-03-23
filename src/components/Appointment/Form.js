import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
    const { onSave, onCancel, interviewers} = props;
    const [student, setStudent] = useState(props.student || '');
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        onChange={(event) => setStudent(event.target.value)}

                    />
                </form>
                <InterviewerList
                    interviewers={interviewers}
                    value={interviewer}
                    onChange={setInterviewer}

                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={onCancel}>Cancel</Button>
                    <Button confirm onclick={() => onSave(student, interviewer)}>Save</Button>
                </section>
            </section>
        </main>
    );
}