import React, { useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";

var calendario = require("calendario");

export const FinalizingView = () => {
  const [state, setState] = useContext(ReservationContext);

  const summaryBooking = `You are making a reservation at ${
    state.selectedHour
  } on ${state.selectedDate} for ${state.numberOfGuest} ${
    state.numberOfGuest > 1 ? "guests" : "guest"
  }`;

  const handlePay = (e) => {
    e.preventDefault();
    setState({ ...state, viewMode: "DoneReservation" });
  };

  calendario.use("US");
  let result = calendario.aboutDay(new Date(state.selectedDate));
  console.log(result);
  useEffect(() => {
    result = calendario.aboutDay(new Date(state.selectedDate));
    console.log(result);
  }, [state.selectedDate]);

  if (state.viewMode === "FinalizingView") {
    return (
      <>
        <h3>Summary</h3>
        <p>{summaryBooking}</p>
        selectedDate: {state.selectedDate} isHoliday: {result}
        <Form onSubmit={handlePay}>
          <FormGroup className="mb-3">
            <Label for="nameOnCard">
              <h6>Name On Card</h6>
            </Label>
            <Input
              id="nameOnCard"
              onChange={(event) =>
                setState({ ...state, customerName: event.target.value })
              }
              value={state?.customerName || ""}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="cardNumber">
              <h6>Card Number</h6>
            </Label>
            <InputGroup>
              <Input
                type="number"
                id="cardNumber"
                onChange={(event) =>
                  setState({ ...state, cardNumber: event.target.value })
                }
                value={state?.cardNumber || ""}
                required
              />
            </InputGroup>
            <div className="row mt-3">
              <div className="col-sm-8">
                <FormGroup>
                  <Label>
                    <h6>Expiration Date</h6>
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="MM"
                      className="form-control"
                      required
                    />
                    <Input
                      type="number"
                      placeholder="YY"
                      className="form-control"
                      required
                    />
                  </InputGroup>
                </FormGroup>
              </div>

              <div className="col-sm-4">
                <div className="form-group mb-4">
                  <FormGroup>
                    <Label>
                      <h6>CVV</h6>
                    </Label>
                    <Input type="text" required className="form-control" />
                  </FormGroup>
                </div>
              </div>
            </div>
          </FormGroup>
          <Button color="danger">Pay</Button>
        </Form>
      </>
    );
  } else {
    return null;
  }
};
