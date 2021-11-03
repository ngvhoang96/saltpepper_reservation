import { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

class SignUpView extends Component {
	render() {
		return (
			<Container className="themed-container">
				<h2 className=" mb-3">Sign Up View</h2>
				<Form>
					<FormGroup>
						<Label for="customerName">Name</Label>
						<Input
							type="text"
							name="name"
							id="customerName"
							placeholder="John Doe"
						/>
					</FormGroup>

					<FormGroup>
						<Label for="customerEmail">Email</Label>
						<Input
							type="email"
							name="email"
							id="customerEmail"
							placeholder="name@example.com"
						/>
					</FormGroup>

					<FormGroup>
						<Label for="customerPassword">Password</Label>
						<Input type="password" name="password" id="customerPassword" />
					</FormGroup>

					<FormGroup>
						<Label for="exampleSelect">Some thing to select</Label>
						<Input type="select" name="select" id="exampleSelect">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</Input>
					</FormGroup>

					<FormGroup>
						<Label for="exampleText">Address</Label>
						<Input type="textarea" name="address" id="customerAddress" />
					</FormGroup>

					<FormGroup tag="fieldset">
						<legend>Radio Buttons</legend>
						<FormGroup check>
							<Label check>
								<Input type="radio" name="radio1" /> Option one is this and
								that—be sure to include why it's great
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="radio" name="radio1" /> Option two can be something
								else and selecting it will deselect option one
							</Label>
						</FormGroup>
						<FormGroup check disabled>
							<Label check>
								<Input type="radio" name="radio1" disabled /> Option three is
								disabled
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" /> Check me out
						</Label>
					</FormGroup>
					<Button color="danger">Submit</Button>
				</Form>
			</Container>
		);
	}
}
export default SignUpView;
