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
		};

		axios
			.put("/api/customer", updatedData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
				setState({ ...state, errorList: error.response.data });
			});
	};

	return (
		<div>
			<h2 className=" mb-3">Account View</h2>
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
							setState({ ...state, email: event.target.value })
						}
						value={state.email}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Phone Number</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, phoneNumber: event.target.value })
						}
						value={state.phoneNumber}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Address</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, address: event.target.value })
						}
						value={state.address}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Password</InputGroupAddon>
					<Input
						placeholder="new password"
						onChange={(event) =>
							setState({ ...state, password: event.target.value })
						}
						value={state.password}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">ID</InputGroupAddon>
					<Input
						onChange={(event) =>
							setState({ ...state, _id: event.target.value })
						}
						value={state._id}
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
