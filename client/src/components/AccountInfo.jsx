import React, { useContext } from "react";

import { Form, Input, Button, InputGroup, InputGroupAddon } from "reactstrap";
import { AccountContext } from "../contextProvider/AccountContext";
import axios from "axios";

export const AccountInfo = ({ onLoggedOut }) => {
	const [state, setState] = useContext(AccountContext);

	const saveHandler = (e) => {
		e.preventDefault();
		const updatedData = {
			id: state._id,
			customerName: state.customerName,
			email: state.email,
			password: state.password,
			phoneNumber: state.phoneNumber,
			address: state.address,
		};

		axios
			.put("/api/customer", updatedData)
			.then((response) => {
				setState({
					...state,
					notify: {
						type: "success",
						msg: ["Account infomation is saved"],
					},
				});
			})
			.catch((error) => {
				setState({
					...state,
					notify: {
						type: "danger",
						msg: error.response.data,
					},
				});
			});
	};

	return (
		<div>
			<h3>Hi {state?.customerName || "member"}</h3>
			<span className="d-block mb-3 text-secondary">
				Preferred Diner ID: {String(state?._id).slice(-6) || 0}
			</span>
			<h5 className=" mb-3">Points: {state?.point || 0}</h5>
			{/* Points work but when updated manually on Mongo it doesnt get updated in the website unless you relog into account */}
			<Form onSubmit={saveHandler}>
				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Name</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, customerName: event.target.value })
						}
						value={state?.customerName || ""}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Email</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, email: event.target.value })
						}
						value={state?.email || ""}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Phone Number</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, phoneNumber: event.target.value })
						}
						value={state?.phoneNumber || ""}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Address</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, address: event.target.value })
						}
						value={state?.address || ""}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Password</InputGroupAddon>
					<Input
						type="password"
						onChange={(event) =>
							setState({ ...state, password: event.target.value })
						}
						value={state?.password || ""}
					/>
				</InputGroup>

				<Button>Save Info</Button>
			</Form>
			<Button className="mt-3" onClick={onLoggedOut}>
				Log out
			</Button>
		</div>
	);
};
