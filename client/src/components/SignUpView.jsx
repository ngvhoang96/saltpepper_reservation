import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import axios from "axios";

export const SignUpView = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    axios
      .post("/api/customer/", { customerName: name, email, password, address })
      .then((response) => {
        console.log(response);
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
            name="name"
            id="customerName"
            placeholder="John Doe"
            onChange={(event) => setName(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="customerEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="customerEmail"
            placeholder="name@example.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="customerPassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="customerPassword"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Address</Label>
          <Input
            type="textarea"
            name="address"
            id="customerAddress"
            onChange={(event) => setAddress(event.target.value)}
          />
        </FormGroup>
        <Button color="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
