import React, { useContext } from "react";
import { Alert, Button } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";

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

	const [state, setState] = useContext(ReservationContext);

	return (
		<Alert color="secondary">
			<div className="border-bottom border-1 border-secondary mb-2">{`Table ${table.tableNumber} (${table.capacity} people)`}</div>
			{hours.map((h) => {
				return (
					<Button
						key={h}
						disabled={
							occupiedHours.includes(h) ||
							(state.selectedHour && h !== state.selectedHour)
						}
						className="m-1 px-3"
						color={occupiedHours.includes(h) ? "secondary" : "danger"}
						onClick={(event) =>
							setState({
								...state,
								selectedDate: date,
								selectedHour: event.target.innerHTML,
								selectedTable: table.tableNumber,
								chosenGuestSize: (state.chosenGuestSize || 0) + table.capacity,
							})
						}
					>
						{h}
					</Button>
				);
			})}
		</Alert>
	);
};
