import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from "react";
export const AccountView = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {
		console.log(`email ${email} and password ${password}`);
	};

	return (
		<div>
			<h1 className="display-3">Log In View</h1>
			<Form>
				<FormGroup>
					<Label>Email</Label>
					<Input
						placeholder="Email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						name="email"
					/>
				</FormGroup>

				<FormGroup>
					<Label>Password</Label>
					<Input
						placeholder="Password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						name="password"
					/>
				</FormGroup>

				<Button color="danger" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};
