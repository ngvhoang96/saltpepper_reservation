import React from "react";
import { Alert, Button } from "reactstrap";

export const TableViewByDate = (props) => {
	const { table, date } = props;
	//Get the reservations of the day
	//The get the hours that already been reserved/occupied
	const currentDateReservation = table.reservations.filter(
		(r) => r.date === date
	);
	const occupiedHours = currentDateReservation.map((r) => r.hour);

	//Set the restaurant hours
	const startHour = 6;
	const endHour = 11;
	const hours = Array.from(
		{ length: endHour - startHour + 1 },
		(v, k) => k + startHour
	).map((h) => h + ":00");

	return (
		<Alert color="secondary">
			<div>{`Table ${table.tableNumber} (${table.capacity} people)`}</div>
			{hours.map((h) => {
				return (
					<Button
						key={h}
						disabled={occupiedHours.includes(h)}
						className="m-1 px-3"
						color={occupiedHours.includes(h) ? "secondary" : "danger"}
						onClick={() => {
							props.onSelectHour(h, table.tableNumber);
						}}
					>
						{h}
					</Button>
				);
				// <Link to={"/make-reservation/" + r.tableNumber}>
				// </Link>
			})}
		</Alert>
	);
};
