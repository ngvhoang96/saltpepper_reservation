import React, { useContext } from "react";
import { AccountContext } from "../contextProvider/AccountContext";
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
} from "reactstrap";

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
	const { _id, hour, date, tableNumber, numberOfGuest } = reservation;
	return (
		<Card className="mb-3">
			<CardHeader>
				<div className="row">
					<div className="col">
						<CardTitle tag="h5">
							{date} {hour}
						</CardTitle>
					</div>
					<div className="col">
						<CardSubtitle className="mb-2 text-muted float-end">
							Reservation# {String(_id).slice(-6)}
						</CardSubtitle>
					</div>
				</div>
			</CardHeader>
			<CardBody>
				<CardTitle>
					Table: {tableNumber} ({numberOfGuest} guests)
				</CardTitle>
			</CardBody>
		</Card>
	);
};
