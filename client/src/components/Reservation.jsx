import React, { useState } from "react";
import { TableView } from "./TableView";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export const Reservation = () => {
	const [viewMode, setViewMode] = useState(1);
	const [isEnoughData, setIsEnoughData] = useState(false);
	const [selectedTable, setSelectedTable] = useState();
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedHour, setSelectedHour] = useState("");
	const [customerName, setCustomerName] = useState("");
	const [numberOfGuest, setNumberOfGuest] = useState(2);
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleSubmitReservation = async (event) => {
		event.preventDefault();
		const newReservation = {
			tableNumber: selectedTable,
			date: selectedDate,
			hour: selectedHour,
			customerName: customerName,
			numberOfGuest: numberOfGuest,
			phoneNumber: phoneNumber,
		};
		const { data: response } = await axios.post(
			"/api/reservation/",
			newReservation
		);

		const updateTableData = {
			reservationID: response._id,
			tableNumber: selectedTable,
			date: selectedDate,
			hour: selectedHour,
			requestType: "add",
		};

		await axios.put("/api/table/", updateTableData).then(setViewMode(2));
	};

	const onConfirmedHour = (date, hour, table) => {
		setSelectedDate(date);
		setSelectedHour(hour);
		setSelectedTable(table);
		console.log(`you have confirmed ${date} ${hour} ${table}`);
		setViewMode(3);
	};

	const checkInputData = () => {
		return (
			customerName !== "" && phoneNumber !== "" && numberOfGuest !== undefined
		);
	};

	switch (viewMode) {
		case 1:
			return <TableView onConfirmedHour={onConfirmedHour} />;
		case 2:
			return (
				<div>
					<h2>Thank you {customerName},</h2>
					<p>
						Your table is booked at {selectedHour} on {selectedDate}
					</p>
					<Link to="/">Home</Link>
				</div>
			);
		case 3:
			return (
				<div>
					<Button className="mb-3" onClick={() => setViewMode(1)}>
						Change my mind
					</Button>
					<Button>Log in</Button>
					<Form onSubmit={handleSubmitReservation}>
						<FormGroup>
							<Label>Date</Label>
							<Input readOnly value={selectedDate} />
						</FormGroup>
						<FormGroup>
							<Label>Hour</Label>
							<Input readOnly value={selectedHour} />
						</FormGroup>

						<FormGroup>
							<Label>How many guest?</Label>
							<Input
								type="select"
								onChange={(event) => {
									setIsEnoughData(checkInputData());
									const value = event.target.value;
									value === "More"
										? setNumberOfGuest(999)
										: setNumberOfGuest(parseInt(value));
								}}
							>
								<option>1</option>
								<option selected="true">2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>More</option>
							</Input>
						</FormGroup>

						<FormGroup>
							<Label>Name</Label>
							<Input
								onChange={(event) => {
									setIsEnoughData(checkInputData());
									setCustomerName(event.target.value);
								}}
							/>
						</FormGroup>

						<FormGroup>
							<Label>Phone number</Label>
							<Input
								onChange={(event) => {
									setPhoneNumber(event.target.value);
									setIsEnoughData(checkInputData());
								}}
							/>
						</FormGroup>
						<Button
							disabled={!isEnoughData}
							color={isEnoughData ? "danger" : "secondary"}
						>
							Submit
						</Button>
					</Form>
				</div>
			);
		default:
			return <div></div>;
	}
};
