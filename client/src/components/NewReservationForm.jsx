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
				<Form onSubmit={proceed}>
					<FormGroup>
						<Label>Date</Label>
						<Input className="mb-2" readOnly value={state.selectedDate} />
					</FormGroup>
					<FormGroup>
						<Label>Hour</Label>
						<Input className="mb-2" readOnly value={state.selectedHour} />
					</FormGroup>

					<FormGroup>
						<Label>How many guest?</Label>
						<Input
							className="mb-2"
							value={state.numberOfGuest || ""}
							readOnly
						/>
					</FormGroup>

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
							value={state?.phoneNumber || ""}
							onChange={(event) => {
								setState({ ...state, phoneNumber: event.target.value });
							}}
							required
							readOnly={state.isLoggedIn}
						/>
					</FormGroup>
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
