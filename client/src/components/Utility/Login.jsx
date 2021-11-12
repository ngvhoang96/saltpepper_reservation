import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from "react";
import { NotifyPanel } from "./NotifyPanel";
import axios from "axios";

export const Login = ({ onSuccess }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorList, setErrorList] = useState([]);

	const handleSubmit = () => {
		axios
			.post("/api/customer/get", { email, password })
			.then(({ data }) => {
				setErrorList([]);
				onSuccess(data);
			})
			.catch(({ response }) => setErrorList([response.data.error]));
	};

	return (
		<div>
			<h2>Please log in</h2>
			<NotifyPanel>{errorList}</NotifyPanel>
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
