import React, { useContext } from "react";
import { AccountContext } from "../contextProvider/AccountContext";
import { Alert } from "reactstrap";

export default function AccountBooking() {
	const [state] = useContext(AccountContext);
	return (
		<>
			{state?.reservation?.map((reservation, key) => (
				<BookingCard key={key} reservation={reservation} />
			))}
		</>
	);
}

const BookingCard = ({ reservation }) => {
	const { _id, hour, date, table, numberOfGuest } = reservation;
	return (
		<>
			<Alert color="secondary">
				<div>ID: {String(_id).slice(-6)}</div>
				Booked on {date} at {hour} at table {table} for {numberOfGuest}
			</Alert>
		</>
	);
};
