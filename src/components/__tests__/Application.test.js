import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  findByText,
  waitForElement,
  queryByText,
  queryByAltText,
  getByTestId,
  
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await findByText(container, "Archie Cohen");

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Confirm that the student's name is shown after the "Saving" indicator is hidden
    const studentName = await findByText(appointment, "Lydia Miller-Jones");
    expect(studentName).toBeInTheDocument();

    debug(appointment);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );i
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you want to delete this appointment?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 4. Wait until the form is displayed.
    await waitForElement(() => getByTestId(appointment, "appointment-form"));
  
    // 5. Change the name and interviewer of the appointment.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  
    // 6. Click the "Save" button on the appointment.
    fireEvent.click(getByText(appointment, "Save"));
  
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    // 8. Wait until the element with the new student name is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  
  it("shows the save error when failing to save an appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => !queryByText(appointment, "Add")
    );
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 6. Mock an error in the save function
    axios.put.mockRejectedValueOnce();
  
    // 7. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
  
    // 8. Check that the element with the text "Error" is displayed.
    expect(await findByText(appointment, "Error")).toBeInTheDocument();
  
    // 9. Click the "Close" button on the error message
    fireEvent.click(queryByAltText(appointment, "Close"));
  
    // 10. Check that the error message is no longer displayed
    expect(queryByText(appointment, "Error")).toBeNull();
  });  

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is displayed.
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
  
    // 5. Mock an error in the delete function
    axios.delete.mockRejectedValueOnce();
  
    // 6. Click the "Confirm" button on the confirmation message.
    fireEvent.click(getByText(appointment, "Confirm"));
  
    // 7. Check that the element with the text "Could not delete appointment" is displayed.
    expect(await findByText(appointment, /Could not cancel appointment/i)).toBeInTheDocument();
  
    // 8. Click the "Close" button on the error message.
    fireEvent.click(queryByAltText(appointment, "Close"));
  
    // 9. Check that the error message is no longer displayed.
    expect(queryByText(appointment, /Could not cancel appointment/i)).toBeNull();
  });
  
  
});
