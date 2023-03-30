import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
    const { onSave, onCancel, interviewers } = props;
    const [student, setStudent] = useState(props.student || '');
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState('');

    const validate = () => {
        if (student.trim() === '') {
            setError('Student name cannot be blank');
            return;
        }
        if (!interviewer || interviewer === null) {
            setError('Please select an interviewer');
            return;
        }
        setError('');
        return true;
    }
    
    const reset = () => {
        setStudent("");
        setInterviewer(null);
        setError('');
    }

    const cancel = () => {
        reset();
        onCancel();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            onSave(student, interviewer);
            reset();
        }
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault() } data-testid="appointment-form">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        selected={interviewer}
                        onChange={(event) => setStudent(event.target.value)}
                        data-testid="student-name-input"

                    />
                </form>
                <InterviewerList
                    interviewers={interviewers}
                    value={interviewer}
                    onChange={ setInterviewer }

                />
                 {error && <p>{error}</p>}
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={handleSubmit}>Save</Button>
                </section>
            </section>
        </main>
    );
}