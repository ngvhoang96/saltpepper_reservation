import {
	Form,
	FormGroup,
	Input,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from "reactstrap";
import React, { useState, useContext } from "react";
import { NotifyPanel } from "./NotifyPanel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../redux_store/reducers/customerReducer";
import { Link } from "react-router-dom";

import saltPepperLogo from "../../assets/saltpepper.jpg";
import lockIcon from "../../assets/lock.png";

const LoginContext = React.createContext({});

export const Login = () => {
	//redux
	const dispatch = useDispatch();
	//
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
				//redux
				dispatch(actionLogin);
			})
			.catch(({ response }) => {
				setState({ ...state, errorList: [response.data.error] });
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
		<Modal isOpen={state.showModal} centered={true} className="modal-lg">
			<ModalHeader className="justify-content-center">Sign in</ModalHeader>
			<Form onSubmit={(event) => onSubmit(event)}>
				<ModalBody>
					<div className="container">
						<div className="row">
							<div className="col text-center my-auto d-none d-sm-block">
								<img
									alt="salt-pepper"
									className="rounded-circle"
									src={saltPepperLogo}
									width="75%"
								/>
							</div>

							<div className="col mx-auto">
								<NotifyPanel>{state.errorList}</NotifyPanel>
								<div className="text-center">
									<img
										alt="lock"
										className="mb-2"
										src={lockIcon}
										width="35px"
									/>
								</div>
								<FormGroup>
									<Input
										placeholder="Email"
										type="email"
										value={state.email}
										onChange={(event) =>
											setState({ ...state, email: event.target.value })
										}
										name="email"
										className="mb-2"
									/>
								</FormGroup>
								<FormGroup>
									<Input
										placeholder="Password"
										type="password"
										value={state.password}
										onChange={(event) =>
											setState({ ...state, password: event.target.value })
										}
										name="password"
										className="mb-2"
									/>
								</FormGroup>
								<span className="fw-light text-secondary d-block mt-3">
									Dont Have an Account?
								</span>
								<Link to="/register">Click Here to Sign Up</Link>
							</div>
						</div>
					</div>
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
