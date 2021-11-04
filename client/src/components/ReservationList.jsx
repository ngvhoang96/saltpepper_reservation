import React from "react";
import "react-calendar/dist/Calendar.css";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {useState } from "react";
import axios from "axios";

export default function ReservationList(props) {
	const { reservation } = props;
	const [modalIsopen, setModalIsOpen] = useState(false)
	return (
		<div>
			{reservation.map((r) => {
				return (
					<div>
					<Alert key={r._id} color="secondary">
						Table {r.tableNumber}
						{" ("}
						{r.capacity}
						{" people)  "}
						<Button
							color={r.isReserved ? "secondary" : "danger"}
							disabled={r.isReserved}
							id = {r.tableNumber.toString()}
							onClick={() =>setModalIsOpen(true)}
						>
							{r.hour}
						</Button>
					</Alert>

					<Modal
							isOpen = {modalIsopen}
							
						>
							<ModalHeader>
							Reserve This Time
							</ModalHeader>
							<ModalBody>
							Are you sure you want to reserve this time?
							</ModalBody>
							<ModalFooter>
							<Button
								color="primary"
								onClick={() => axios.put("/api/reservation/" + 2,{isReserved: true})}
								// Still working on this and am having trouble getting the right number to send to the database to update.
								//hard coded table number two to update to true.
							>
								Reserve
							</Button>
							{' '}
							<Button onClick={() => setModalIsOpen(false)}>
								Cancel
							</Button>
							</ModalFooter>
						</Modal>
					</div>
				);
			})}
		</div>
	);
}
