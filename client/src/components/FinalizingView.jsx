import React, { useContext, useEffect } from "react";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Button } from "reactstrap";

import holidays from "@date/holidays-us";
import PaymentForm from "./PaymentForm";

export const FinalizingView = ({ onSubmit }) => {
	const [state, setState] = useContext(ReservationContext);

	const summaryBooking = `You are making a reservation at ${
		state.selectedHour
	} on ${state.selectedDate} for ${state.numberOfGuest} ${
		state.numberOfGuest > 1 ? "guests" : "guest"
	}`;

	useEffect(() => {
		var parts = (state?.selectedDate || "01-03-2021").split("-");
		var selectedDate = new Date(parts[2], parts[0] - 1, parts[1]);
		console.log(selectedDate.getDay());
		//if the selected day is a saturday, sunday, or a holiday
		//week starts on sunday [0] and ends on saturday [6]
		if (
			selectedDate.getDay() === 0 ||
			selectedDate.getDay() === 6 ||
			holidays.isHoliday(selectedDate)
		) {
			setState((state) => ({ ...state, isHoliday: true }));
		} else {
			setState((state) => ({ ...state, isHoliday: false }));
		}
	}, [state.selectedDate, setState]);

	if (state.viewMode === "FinalizingView") {
		return (
			<>
				<Button
					disabled={state.paid || false}
					className="mb-3"
					onClick={() => setState({ ...state, viewMode: "ReservationForm" })}
				>
					Change my mind
				</Button>
				<h3>Summary</h3>
				<p>{summaryBooking}</p>
				<PaymentForm onSubmit={onSubmit} />
			</>
		);
	} else {
		return null;
	}
};
