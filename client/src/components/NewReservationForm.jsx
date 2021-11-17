import { useContext } from "react";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Login } from "./Utility/Login";

export const NewReservationForm = ({ handleSubmit }) => {
	const [state, setState] = useContext(ReservationContext);

	if (state.viewMode === "ReservationForm") {
		return (
			<div>
				<Button onClick={() => setState({ ...state, viewMode: "TableView" })}>
					Change my mind
				</Button>{" "}
				{state?.isLoggedIn ? "" : <Login />}
				<Form onSubmit={handleSubmit}>
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
							type="select"
							onChange={(event) => {
								const value = event.target.value;
								const numberOfGuest = value === "More" ? 999 : parseInt(value);
								setState({ ...state, numberOfGuest: numberOfGuest });
							}}
							defaultValue="Please select"
						>
							<option disabled>Please select</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>More</option>
						</Input>
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
					<Button color="danger">Submit</Button>
				</Form>
			</div>
		);
	} else {
		return null;
	}
};
