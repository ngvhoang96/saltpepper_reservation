import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { NotifyPanel } from "./Utility/NotifyPanel";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionFetchCustomerData } from "../redux_store/reducers/customerReducer";
import validator from "validator";

export const SignUpView = ({ data }) => {
  const [state, setState] = useState(data || {});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.isSameAddress) {
      setState({ ...state, billingAddress: state?.address || "" });
    }

    const newCustomer = {
      customerName: state.customerName || undefined,
      email: state.email || undefined,
      password: state.password || undefined,
      phoneNumber: state.phoneNumber || undefined,
      address: state.address || undefined,
      billingAddress: state.billingAddress || undefined,
    };

    axios
      .post("/api/customer/", newCustomer)
      .then(({ data }) => {
        setState({
          ...state,
          isSignedUp: true,
          notify: { type: "success", msg: ["Account is created"] },
        });
        localStorage.setItem("_token", data.token);
        //redux
        dispatch(actionFetchCustomerData);
      })
      .catch((error) => {
        setState({
          ...state,
          notify: { type: "danger", msg: error.response.data },
        });
      });
  };

  if (state?.isSignedUp) {
    return (
      <div>
        <NotifyPanel type={state.notify?.type}>{state.notify?.msg}</NotifyPanel>
        <h3>Thank you {state.customerName},</h3>
        <Link to="/account">See account</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className=" mb-3">Create a new account</h2>
        <NotifyPanel type={state.notify?.type}>{state.notify?.msg}</NotifyPanel>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="customerName">Name</Label>
            <Input
              type="text"
              id="customerName"
              placeholder="John Doe"
              value={state.customerName || ""}
              onChange={(e) =>
                setState({ ...state, customerName: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="customerEmail">Email</Label>
            <Input
              type="email"
              id="customerEmail"
              placeholder="name@example.com"
              value={state.email || ""}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="customerPassword">Password</Label>
            <Input
              type="password"
              id="customerPassword"
              value={state.password || ""}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              value={state.phoneNumber || ""}
              onChange={(e) =>
                setState({ ...state, phoneNumber: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">Address</Label>
            <Input
              id="customerAddress"
              value={state.address || ""}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="checkbox"
              defaultChecked={!!state.isSameAddress}
              onChange={() =>
                setState({
                  ...state,
                  isSameAddress: !state.isSameAddress,
                })
              }
            />
            <Label>Billing Address is the same as Mailing Address</Label>
          </FormGroup>
          <FormGroup>
            <Label>Billing Address</Label>
            <Input
              id="customerBillingAddress"
              disabled={state.isSameAddress || false}
              value={
                state.isSameAddress ? state.address : state.billingAddress || ""
              }
              onChange={(e) =>
                setState({ ...state, billingAddress: e.target.value })
              }
            />
          </FormGroup>
          <Button color="danger">Submit</Button>
        </Form>
      </div>
    );
  }
};
