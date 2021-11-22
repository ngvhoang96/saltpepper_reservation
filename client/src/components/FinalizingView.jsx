import React, { useContext, useEffect } from "react";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { Button } from "reactstrap";

import holidays from "@date/holidays-us";
import PaymentForm from "./PaymentForm";

export const FinalizingView = ({ onSubmit }) => {
	const [state, setState] = useContext(ReservationContext);

	useEffect(() => {
		var parts = (state?.selectedDate || "01-03-2021").split("-");
		var selectedDate = new Date(parts[2], parts[0] - 1, parts[1]);
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
				<BookingSummary data={state} />
				<PaymentForm />
				<ConfirmBooking
					show={state.paid || !state.isHoliday}
					onSubmit={onSubmit}
				/>
			</>
		);
	} else {
		return null;
	}
};

const BookingSummary = ({ data }) => {
	const {
		selectedDate,
		selectedHour,
		numberOfGuest,
		customerName,
		email,
		phoneNumber,
	} = data;
	return (
		<>
			<h3>Summary</h3>
			<div className="mb-3 p-2">
				<div className="row border-bottom border-gray py-3">
					<div className="col-3">Name</div>
					<div className="col">{customerName}</div>
				</div>
				<div className="row border-bottom border-gray py-2">
					<div className="col-3">Date</div>
					<div className="col">{selectedDate}</div>
				</div>
				<div className="row border-bottom border-gray py-2">
					<div className="col-3">Hour</div>
					<div className="col">{selectedHour}</div>
				</div>
				<div className="row border-bottom border-gray py-2">
					<div className="col-3">Number of guests</div>
					<div className="col">{numberOfGuest}</div>
				</div>
				<div className="row border-bottom border-gray py-2">
					<div className="col-3">Email</div>
					<div className="col">{email}</div>
				</div>
				<div className="row border-bottom border-gray py-2">
					<div className="col-3">Phone</div>
					<div className="col">{phoneNumber}</div>
				</div>
			</div>
		</>
	);
};

const ConfirmBooking = ({ show, onSubmit }) => {
	if (show) {
		return (
			<>
				<Button color="danger" onClick={onSubmit}>
					Confirm booking
				</Button>
			</>
		);
	} else {
		return null;
	}
};
