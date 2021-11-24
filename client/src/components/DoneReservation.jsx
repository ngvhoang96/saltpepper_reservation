import React, { useContext } from "react";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

export const DoneReservation = () => {
	const [state] = useContext(ReservationContext);

	if (state.viewMode === "DoneReservation") {
		return (
			<Alert color="success">
				<h2>Thank you {state.customerName},</h2>
				<hr />
				<p>
					Your reservation is booked at {state.selectedHour} on{" "}
					{state.selectedDate}
				</p>
				<Link to="/">Home</Link>
			</Alert>
		);
	} else {
		return null;
	}
};
