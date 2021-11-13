import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from "reactstrap";
import React, { useState, useContext } from "react";
import { NotifyPanel } from "./NotifyPanel";
import axios from "axios";

const LoginContext = React.createContext({});

export const Login = () => {
	const [state, setState] = useState({
		isLoggedIn: false,
		showModal: false,
		email: "",
		password: "",
		errorList: [],
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("/api/customer/login", {
				email: state.email,
				password: state.password,
			})
			.then(({ data }) => {
				setState({ ...state, errorList: [], isLoggedIn: true });
				localStorage.setItem("_token", data.token);

				console.log(data.customer);
				//const { customerName, phoneNumber } = data.customer;
				// setAppContext({
				// 	...appContext,
				// 	isLoggedIn: true,
				// 	customerName: customerName,
				// 	phoneNumber: phoneNumber,
				// });
			})
			.catch(({ response }) => {
				setState({ ...state, errorList: [response.data.error] });
				// setAppContext({ ...appContext, errorList: [response.data.error] });
			});
	};

	if (state.isLoggedIn) {
		return null;
	} else {
		return (
			<LoginContext.Provider value={[state, setState]}>
				<Button onClick={() => setState({ ...state, showModal: true })}>
					Sign In
				</Button>
				<LoginForm onSubmit={handleSubmit} />
			</LoginContext.Provider>
		);
	}
};

const LoginForm = ({ onSubmit }) => {
	const [state, setState] = useContext(LoginContext);

	return (
		<Modal isOpen={state.showModal} centered={true}>
			<ModalHeader>Please sign in</ModalHeader>
			<Form onSubmit={(event) => onSubmit(event)}>
				<ModalBody>
					<NotifyPanel>{state.errorList}</NotifyPanel>
					<FormGroup>
						<Label>Email</Label>
						<Input
							placeholder="Email"
							type="email"
							value={state.email}
							onChange={(event) =>
								setState({ ...state, email: event.target.value })
							}
							name="email"
						/>
					</FormGroup>

					<FormGroup>
						<Label>Password</Label>
						<Input
							placeholder="Password"
							type="password"
							value={state.password}
							onChange={(event) =>
								setState({ ...state, password: event.target.value })
							}
							name="password"
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button onClick={() => setState({ ...state, showModal: false })}>
						Cancel
					</Button>
					<Button color="danger">Submit</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};