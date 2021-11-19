import { useContext } from "react";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Login } from "./Utility/Login";

export const NewReservationForm = () => {
	const [state, setState] = useContext(ReservationContext);

	const handleSubmitFee = () => {
		setState({ ...state, viewMode: "FinalizingView" });
	};

	if (state.viewMode === "ReservationForm") {
		return (
			<div>
				<Button onClick={() => setState({ ...state, viewMode: "TableView" })}>
					Change my mind
				</Button>{" "}
				{state?.isLoggedIn ? "" : <Login />}
				<Form onSubmit={handleSubmitFee}>
					<FormGroup>
						<Label>Date</Label>
						<Input readOnly value={state.selectedDate} />
					</FormGroup>
					<FormGroup>
						<Label>Hour</Label>
						<Input readOnly value={state.selectedHour} />
					</FormGroup>

					<FormGroup>
						<Label>How many guest?</Label>
						<Input
							onChange={(event) => {
								setState({ ...state, numberOfGuest: event.target.value });
							}}
							value={state.numberOfGuest || ""}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Name</Label>
						<Input
							value={state?.customerName || ""}
							onChange={(event) => {
								const customerName = event.target.value;
								setState({ ...state, customerName: customerName });
							}}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Phone number</Label>
						<Input
							value={state?.phoneNumber || ""}
							onChange={(event) => {
								const phoneNumber = event.target.value;
								setState({ ...state, phoneNumber: phoneNumber });
							}}
						/>
					</FormGroup>
					<Button color="danger">Proceed</Button>
				</Form>
			</div>
		);
	} else {
		return null;
	}
};
