import React from "react";
import "react-calendar/dist/Calendar.css";
import { Alert, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ReservationList(props) {
	const { reservation } = props;
	const [modalIsopen, setModalIsOpen] = useState(false);
	return (
		<div>
			{reservation
				.filter((r) => r.isReserved === false)
				.map((r) => {
					return (
						<div>
							<Alert key={r._id} color="secondary">
								Table {r.tableNumber}
								{" ("}
								{r.capacity}
								{" people)  "}
								<Link to={"/make-reservation/" + r.tableNumber}>
									<Button
										color="danger"
										disabled={r.isReserved}
										id={r.tableNumber.toString()}
										onClick={() => setModalIsOpen(true)}
									>
										{r.hour}
									</Button>
								</Link>
							</Alert>

							{/* <Modal isOpen={modalIsopen}>
							<ModalHeader>Reserve This Time</ModalHeader>
							<ModalBody>Are you sure you want to reserve this time?</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									onClick={() =>
										axios.put("/api/reservation/" + 2, { isReserved: true })
									}
									// Still working on this and am having trouble getting the right number to send to the database to update.
									//hard coded table number two to update to true.
								>
									Reserve
								</Button>{" "}
								<Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
							</ModalFooter>
						</Modal> */}
						</div>
					);
				})}
		</div>
	);
}
