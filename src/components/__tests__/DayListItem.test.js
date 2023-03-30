import React from "react";
import { 
  render,
  cleanup,
  getAllByTestId,
  waitForElement,
  queryByText,
  fireEvent,
  getByAltText,
  getByPlaceholderText,
  getByText  } from "@testing-library/react";
import DayListItem from "components/DayListItem";
import Application from "components/Application";


afterEach(cleanup);

describe("DayListItem", () => {

  it("renders without crashing", () => {
    render(<DayListItem />);
  });

  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});