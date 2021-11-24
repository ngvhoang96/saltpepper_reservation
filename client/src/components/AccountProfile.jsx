import React, { useContext } from "react";
import { AccountContext } from "../contextProvider/AccountContext";
import {
	Form,
	Input,
	Button,
	InputGroup,
	InputGroupAddon,
	Label,
	FormGroup,
} from "reactstrap";
import axios from "axios";
import { useDispatch } from "react-redux";

function AccountProfile() {
	const [state, setState] = useContext(AccountContext);
	const dispatch = useDispatch();

	const saveHandler = (e) => {
		e.preventDefault();
		const updatedData = {
			id: state._id,
			customerName: state.customerName,
			email: state.email,
			password: state.password,
			phoneNumber: state.phoneNumber,
			address: state.address,
			preferredPaymentMethod: state.preferredPaymentMethod,
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
				dispatch({ type: "action.updateCustomer", payload: updatedData });
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

	const handleChangePaymentMethod = (event) => {
		const newMethod = event.target.value;
		setState({ ...state, preferredPaymentMethod: newMethod });
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
						type="email"
						onChange={(event) =>
							setState({ ...state, email: event.target.value })
						}
						value={state?.email || ""}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroupAddon addonType="prepend">Phone Number</InputGroupAddon>
					<Input
						type="number"
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

				<PreferredPayment
					selected={state.preferredPaymentMethod}
					onChangeMethod={handleChangePaymentMethod}
				/>

				<Button color="danger">Update</Button>
			</Form>
		</div>
	);
}

const PreferredPayment = ({ selected, onChangeMethod }) => {
	const methods = ["Credit", "Cash", "Check"];

	return (
		<FormGroup className="mb-3">
			<Label className="me-2">Payment method: </Label>
			{methods.map((method, key) => {
				return (
					<Label className="me-2" key={key}>
						<Input
							type="radio"
							value={method}
							checked={method === selected}
							onChange={onChangeMethod}
						/>
						{method}
					</Label>
				);
			})}
		</FormGroup>
	);
};

export default AccountProfile;
