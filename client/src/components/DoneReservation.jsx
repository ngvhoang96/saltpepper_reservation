import React, { useContext } from "react";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Link } from "react-router-dom";

export const DoneReservation = () => {
	const [state] = useContext(ReservationContext);

	if (state.viewMode === "DoneReservation") {
		return (
			<div>
				<h2>Thank you {state.customerName},</h2>
				<p>
					Your table is booked at {state.selectedHour} on {state.selectedDate}
				</p>
				<Link to="/">Home</Link>
			</div>
		);
	} else {
		return null;
	}
};
