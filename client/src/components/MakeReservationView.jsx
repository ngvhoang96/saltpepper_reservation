import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export const MakeReservationView = (props) => {
	const [isReserved, setReserved] = useState(false);
	const [customerName, setCustomerName] = useState("");

	const handleSubmit = async () => {
		await axios.put("/api/reservation/" + currentTableNumber, {
			isReserved: true,
			customerName: customerName,
		});

		setReserved(true);
	};

	const currentTableNumber = props.match.params.tableNumber;
	return (
		<Container className="themed-container">
			{isReserved === false ? (
				<div>
					<h2 className=" mb-3">
						Make reservation for table {currentTableNumber}
					</h2>
					<Form>
						<FormGroup>
							<Label for="customerName">Name</Label>
							<Input
								onChange={(event) => setCustomerName(event.target.value)}
								type="text"
								placeholder="John Doe"
							/>
						</FormGroup>

						<FormGroup>
							<Label for="exampleText">Address</Label>
							<Input type="textarea" name="address" id="customerAddress" />
						</FormGroup>

						<Button onClick={handleSubmit} color="danger">
							Submit
						</Button>
					</Form>
				</div>
			) : (
				<div>
					Thank you {customerName}
					<p>Table {currentTableNumber} is now reserved</p>
					<Link to="/">Go back to homepage</Link>
				</div>
			)}
		</Container>
	);
};
