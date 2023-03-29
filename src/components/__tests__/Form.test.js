import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
    <Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it('validates that the student name is not blank', () => {
    const onSave = jest.fn();
    const { getByText, getByTestId } = render(
      <Form interviewers={[]} onSave={onSave} />
    );
  
    fireEvent.click(getByTestId('student-name-input'), {
      target: { value: '' },
    });
    fireEvent.click(getByText('Save'));
  
    expect(getByText('Student name cannot be blank')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it('validates that the interviewer cannot be null', () => {
    const onSave = jest.fn();
    const interviewers = [
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    ];
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText('Save'));
  
    expect(getByText('Please select an interviewer')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
});

