import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import axios from "axios";

export const SignUpView = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [notChecked, setCheck] = useState("");

  const handleSubmit = () => {
    if (notChecked) {
      setBillingAddress(address);
    }
    axios
      .post("/api/customer/", {
        customerName: name,
        email,
        password,
        address,
        phoneNumber,
        points: 0,
        billingAddress,
      })
      .then((response) => {
        console.log(response);
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <h2 className=" mb-3">Sign Up View</h2>
      <Form>
        <FormGroup>
          <Label for="customerName">Name</Label>
          <Input
            type="text"
            id="customerName"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="customerEmail">Email</Label>
          <Input
            type="email"
            id="customerEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="customerPassword">Password</Label>
          <Input
            type="password"
            id="customerPassword"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="phoneNumber">Phone number</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Address</Label>
          <Input
            id="customerAddress"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <Label>Billing Address</Label>
          <Input
            id="customerBillingAddress"
            className="hidden"
            disabled={!notChecked}
            value={!notChecked ? address : billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
          />
          <Input
            type="checkbox"
            defaultChecked={true}
            onChange={(event) => setCheck(!notChecked)}
          />
          <Label>Billing Address is the same as Mailing Address</Label>
        </FormGroup>
        <Button color="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
