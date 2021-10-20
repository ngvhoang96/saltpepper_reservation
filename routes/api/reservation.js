import express from "express";

const router = express.Router();
const reservations = [
	{ reservationID: 1, tableNumber: 14, isReserved: false },
	{ reservationID: 2, tableNumber: 11, isReserved: false },
];

router.get("/", (req, res) => {
	res.send(reservations);
});

router.get("/:id", (req, res) => {
	const reservation = reservations.find(
		(r) => r.reservationID == req.params.id
	);
	res.send(reservation);
});

export default router;
