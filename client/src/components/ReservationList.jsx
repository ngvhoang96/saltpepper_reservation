import React from "react";
import "react-calendar/dist/Calendar.css";
import { Alert, Button } from "reactstrap";

export default function ReservationList(props) {
	const { reservation } = props;
	return (
		<div>
			{reservation.map((r) => {
				return (
					<Alert key={r._id} color="secondary">
						Table {r.tableNumber}{" "}
						<Button
							color={r.isReserved ? "secondary" : "danger"}
							disabled={r.isReserved}
						>
							{r.hour}
						</Button>
					</Alert>
				);
			})}
		</div>
	);
}
