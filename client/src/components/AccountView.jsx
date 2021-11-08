import { Component, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import axios from "axios";

// function Register ()
// {
// 	const [userNameReg, setUsername] = useState("");
// 	const [passWordReg, setPassword] = useState("");
	
// 	const Submit = () =>
// 	{
// 		axios.post('http://localhost:3000/account/',{username: userNameReg, 
// 	password: passWordReg}).then((response) => 
// 	{
// 		console.log(response);
// 	})
// 	}
// }

class AccountView extends Component {

	state = 
	{
		value: '',
		email: '',
		password: ''
	}

	getValue = (e) => 
	{
		const name = e.target.name;
		const value = e.target.value; 

		this.setState({[name]: value}); 
	}

	handleSumbit = (e) => 
	{
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		console.log('Email on Submit',email);
		console.log('Password on Submit', password);

	};

	render() {

		console.log("State: ", this.state);
		return (
			<div>
				<Form>
  <FormGroup row>
    <Label
    >
      Email
    </Label>
    <Col sm={10}>
      <Input
        placeholder="Email"
        type="email"
		onChange = {this.getValue} name = 'email'
      />
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label
    >
      Password
    </Label>
    <Col sm={10}>
      <Input
        placeholder="Password"
        type="password"
		onChange = {this.getValue} name = 'password'
      />
    </Col>
  </FormGroup>
     <Button color= "danger" outline onClick = {this.handleSumbit}>
       Submit
     </Button>
</Form>
			</div>
		);
	}
}
export default AccountView;

//   <Form inline>
//     <FormGroup floating>
//       <Input
//         id="exampleEmail"
//         name="email"
//         placeholder="Email"
//         type="email"
// 		value = {this.state.EmailPlace}
//       />
//       <Label for="exampleEmail">
//         Email
//       </Label>
//     </FormGroup>
//     {' '}
//     <FormGroup floating>
//       <Input
//         id="examplePassword"
//         name="password"
//         placeholder="Password"
//         type="password"
//       />
//       <Label for="examplePassword">
//         Password
//       </Label>
//     </FormGroup>
//     {' '}
//     <Button>
//       Submit
//     </Button>
//   </Form>