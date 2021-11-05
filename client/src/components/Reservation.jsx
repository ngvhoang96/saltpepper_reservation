import React, { useState } from "react";
import { TableView } from "./TableView";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";

export const Reservation = () => {
	const [confirmedHour, setConfirmedHour] = useState(false);
	const [customerName, setCustomerName] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedHour, setSelectedHour] = useState("");
	const [selectedTable, setSelectedTable] = useState();

	const onConfirmedHour = (date, hour, table) => {
		setSelectedDate(date);
		setSelectedHour(hour);
		setSelectedTable(table);
		console.log(`you have confirmed ${date} ${hour} ${table}`);
		setConfirmedHour(true);
	};

	if (!confirmedHour) {
		return <TableView onConfirmedHour={onConfirmedHour} />;
	} else {
		return (
			<div>
				<Button className="mb-3" onClick={() => setConfirmedHour(false)}>
					Change my mind
				</Button>
				<Button>Log in</Button>
				<Form>
					<FormGroup>
						<Label>Date</Label>
						<Input readOnly value={selectedDate} />
					</FormGroup>
					<FormGroup>
						<Label>Hour</Label>
						<Input readOnly value={selectedHour} />
					</FormGroup>
					<FormGroup>
						<Label>Name</Label>
						<Input onChange={(event) => setCustomerName(event.target.value)} />
					</FormGroup>
					<Button color="danger">Submit</Button>
				</Form>
			</div>
		);
	}
};
