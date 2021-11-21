import { useContext } from "react";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Login } from "./Utility/Login";

export const NewReservationForm = () => {
  const [state, setState] = useContext(ReservationContext);

  const handleSubmitFee = () => {
    setState({ ...state, viewMode: "FinalizingView" });
  };

  if (state.viewMode === "ReservationForm") {
    return (
      <div>
        <div className="mb-2">
          <Button onClick={() => setState({ ...state, viewMode: "TableView" })}>
            Change my mind
          </Button>{" "}
          {state?.isLoggedIn ? "" : <Login />}
        </div>

        <Form onSubmit={handleSubmitFee}>
          <FormGroup>
            <Label>Date</Label>
            <Input className="mb-2" readOnly value={state.selectedDate} />
          </FormGroup>
          <FormGroup>
            <Label>Hour</Label>
            <Input className="mb-2" readOnly value={state.selectedHour} />
          </FormGroup>

          <FormGroup>
            <Label>How many guest?</Label>
            <Input
              className="mb-2"
              onChange={(event) => {
                setState({ ...state, numberOfGuest: event.target.value });
              }}
              value={state.numberOfGuest || ""}
            />
          </FormGroup>

          <FormGroup>
            <Label>Name</Label>
            <Input
              className="mb-2"
              value={state?.customerName || ""}
              onChange={(event) => {
                const customerName = event.target.value;
                setState({ ...state, customerName: customerName });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone number</Label>
            <Input
              value={state?.phoneNumber || ""}
              onChange={(event) => {
                const phoneNumber = event.target.value;
                setState({ ...state, phoneNumber: phoneNumber });
              }}
            />
          </FormGroup>
          <Button className="mt-3" color="danger">
            Proceed
          </Button>
        </Form>
      </div>
    );
  } else {
    return null;
  }
};
