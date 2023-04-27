import React from "react";
import axios from "../../__mocks__ /axios";

import { 
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText, 
  queryByText,
  queryByAltText,
  getByDisplayValue,
  mockRejectedValueOnce
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });


  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    
    //wait for axios request to complete 
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //identify first appt slot
    const appointment = getAllByTestId(container, "appointment")[0];
    
    //add appt
    fireEvent.click(getByAltText(appointment, "Add"));
    
    //enter name
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    //choose interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    
    //click save
    fireEvent.click(getByText(appointment, "Save"))

    //check that its changes to the saving wheel
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //check that the appt appears with name, after it saves
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //check the spots update
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"))

    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  }),


  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Edit"))

    // 4. Check that the form shows up with text "Archie Cohen" 
    expect(getByDisplayValue(appointment, "Archie Cohen"))

    // 5. Change the name to "Tara Mac"
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Tara Mac" }
    });

    // 6. Click the "Save" button 
    fireEvent.click(getByText(appointment, "Save"))
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 8. Wait until the element with the appt appears with the text "Tara Mac"
    await waitForElement(() => getByText(appointment, "Tara Mac"));
    
    // 9. Check that the DayListItem with the text "Monday" has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  }),


  xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render application
    const { container } = render(<Application />)

    // 2. Wait for data to load
    await waitForElement(() => getByText(container, "Archie Cohen"))

    // 3. Identify first open appt slot
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    
    // 4. Click add appointment 
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 5. Type in name
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 6. Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    
    // 7. Click save
    fireEvent.click(getByText(appointment, "Save"))

    // 8. Wait for promise to reject, and check that error appears
    await waitForElement(() => getByText(appointment, "Could not save"));

    // 9. Close the error and check that it goes back to Add 
    fireEvent.click(getByAltText(appointment, "Close"))
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

  }),



  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render application
    const { container } = render(<Application />)

    // 2. Wait for data to load
    await waitForElement(() => getByText(container, "Archie Cohen"))

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"))
    
    // 4. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))
    
    
    // 5. Wait for promise to reject, and check that error appears
    await waitForElement(() => getByText(appointment, "Could not delete"));
    
    // 6. Close the error and check that it goes back to original appointment
    fireEvent.click(getByAltText(appointment, "Close"))
    expect(queryByText(appointment, "Archie Cohen")).toBeInTheDocument();
    
  });
  
})