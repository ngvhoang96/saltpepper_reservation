import React, { useContext } from "react";
import { AccountContext } from "../contextProvider/AccountContext";
import {
	Form,
	Input,
	Button,
	InputGroup,
	InputGroupAddon,
	Label,
} from "reactstrap";
import axios from "axios";

function AccountProfile() {
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

				<InputGroup>
					<Label>Preferred payment method: </Label>
				</InputGroup>

				<Button color="danger">Update</Button>
			</Form>
		</div>
	);
}

export default AccountProfile;
