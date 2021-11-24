import { useContext, useState } from "react";
import {
	Button,
	Input,
	Form,
	FormGroup,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Login } from "./Utility/Login";
import { SignUpView } from "./SignUpView";
import { Link } from "react-router-dom";

export const NewReservationForm = () => {
	const [state, setState] = useContext(ReservationContext);

	const proceed = (event) => {
		event.preventDefault();
		setState({ ...state, viewMode: "FinalizingView" });
	};

	if (state.viewMode === "ReservationForm") {
		return (
			<div>
				<div className="mb-2">
					<Button onClick={() => setState({ ...state, viewMode: "TableView" })}>
						Change my mind
					</Button>{" "}
				</div>
				<div className="mb-3 p-2">
					<div className="row border-bottom border-gray py-2">
						<div className="col-3">Date</div>
						<div className="col">{state.selectedDate}</div>
					</div>
					<div className="row border-bottom border-gray py-2">
						<div className="col-3">Hour</div>
						<div className="col">{state.selectedHour}</div>
					</div>
					<div className="row border-bottom border-gray py-2">
						<div className="col-3">Guests</div>
						<div className="col">{state.numberOfGuest}</div>
					</div>
				</div>
				<Form onSubmit={proceed}>
					<FormGroup>
						<Label>Name</Label>
						<Input
							className="mb-2"
							value={state?.customerName || ""}
							onChange={(event) => {
								setState({ ...state, customerName: event.target.value });
							}}
							required
							readOnly={state.isLoggedIn}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Email</Label>
						<Input
							type="email"
							className="mb-2"
							value={state?.email || ""}
							onChange={(event) => {
								setState({ ...state, email: event.target.value });
							}}
							required
							readOnly={state.isLoggedIn}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Phone number</Label>
						<Input
							type="number"
							className="mb-2"
							value={state?.phoneNumber || ""}
							onChange={(event) => {
								setState({ ...state, phoneNumber: event.target.value });
							}}
							required
							readOnly={state.isLoggedIn}
						/>
					</FormGroup>

					{state.isLoggedIn ? (
						<div className="fst-italic">
							If you want to update your account information, please go to{" "}
							<Link to="/account">My profile</Link>
						</div>
					) : (
						""
					)}

					<Button className="mt-3" color="danger">
						Proceed {state.isLoggedIn ? "" : "as a guest"}
					</Button>
				</Form>
				<SignUpSignIn show={!state.isLoggedIn} data={state} />
			</div>
		);
	} else {
		return null;
	}
};

const SignUpSignIn = ({ show, data }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	if (show) {
		return (
			<div className="mt-3">
				<span className="d-block mb-2">
					Want to save your information for future booking?
				</span>
				<Button onClick={toggleModal}>Create new account</Button>
				<span className="mx-2">or</span>
				<Login />
				<Modal isOpen={showModal}>
					<ModalBody>
						<SignUpView data={data} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={toggleModal}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	} else {
		return null;
	}
};
