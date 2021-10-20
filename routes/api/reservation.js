import express from "express";

const router = express.Router();
const reservations = [
	{ reservationID: 1, tableNumber: 14, isReserved: false },
	{ reservationID: 2, tableNumber: 11, isReserved: false },
	{ reservationID: 3, tableNumber: 5, isReserved: true },
	{ reservationID: 4, tableNumber: 7, isReserved: true },
	{ reservationID: 5, tableNumber: 21, isReserved: false },
];

router.get("/", (req, res) => {
	res.send(reservations);
});

router.get("/:id", (req, res) => {
	const reservation = reservations.find(
		(r) => r.reservationID == parseInt(req.params.id)
	);
	if (reservation === undefined) {
		res.status(404).send();
	} else {
		res.send(reservation);
	}
});

router.post("/", (req, res) => {
	const reservation = { ...req.body };
	if (reservation.tableNumber && reservation.isReserved) {
		reservation.reservationID = reservations.length + 1;

		reservations.push(reservation);
		res.status(201).send(reservation);
	} else {
		res.status(400).send("Please include both tableNumber and isReserved");
	}
});

router.put("/:id", (req, res) => {
	const newReservation = { ...req.body };
	newReservation.reservationID = parseInt(req.params.id);
	const oldReservation = reservations.find(
		(r) => r.reservationID == newReservation.reservationID
	);
	if (oldReservation === undefined) {
		res.sendStatus(404).send();
	} else {
		for (const field in oldReservation) {
			oldReservation[field] = newReservation[field];
		}
		res.send(oldReservation);
	}
});

router.delete("/:id", (req, res) => {
	const deletingReservation = reservations.find(
		(r) => r.reservationID == parseInt(req.params.id)
	);
	if (deletingReservation === undefined) {
		res.status(404).send();
	} else {
		const index = reservations.indexOf(deletingReservation);
		reservations.splice(index, 1);
		res.send(
			`Reservation ${deletingReservation.reservationID} has been deleted`
		);
	}
});
export default router;
