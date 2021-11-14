import React, { Component, useEffect, useState } from "react";
import { Login } from "./Utility/Login";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  InputGroup,
  Label,
  InputGroupAddon,
} from "reactstrap";
import { NotifyPanel } from "./Utility/NotifyPanel";

export const AccountView = () => {
  // constructor(props)
  // {
  //     super(props)
  //     this.state={
  //         Name:'Channy',
  //         Email:'nomail@gmail.com',
  //        PhoneNumber:'###-###-####',
  //         Address:'1213 nostreet'
  //     }
  // }

  const [state, setState] = useState({
    customerName: "Channy",
    customerEmail: "",
    customerPhoneNumber: "",
    customerAddress: "",
    customerID: "",
    customerPassword: "",
    errorList: [],
  });

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(state);
    const updatedData = {
      id: state.customerID,
      customerName: state.customerName,
      email: state.customerEmail,
      password: state.customerPassword,
      phoneNumber: state.customerPhoneNumber,
    };
    axios
      .put("/api/customer", updatedData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        setState({ ...state, errorList: error.response.data });
      });
  };

  if (localStorage.getItem("_token")) {
    return (
      <div>
        <h2 className=" mb-3">Account View</h2>
        <NotifyPanel>{state.errorList}</NotifyPanel>
        <Form onSubmit={saveHandler}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerName: event.target.value })
              }
              value={state.customerName}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerEmail: event.target.value })
              }
              value={state.customerEmail}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Phone Number</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerPhoneNumber: event.target.value })
              }
              value={state.customerPhoneNumber}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerAddress: event.target.value })
              }
              value={state.customerAddress}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerPassword: event.target.value })
              }
              value={state.customerPassword}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">ID</InputGroupAddon>
            <Input
              onChange={(event) =>
                setState({ ...state, customerID: event.target.value })
              }
              value={state.customerID}
            />
          </InputGroup>

          <Button>Save Info</Button>
        </Form>
      </div>
    );
  } else {
    return <Login />;
  }
};
