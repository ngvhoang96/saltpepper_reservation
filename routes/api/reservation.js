import express from "express";
import {
	connect,
	getReservation,
	addReservation,
} from "../../mongooseAPI/reservation.js";

const router = express.Router();
router.use(connect);

// const reservations = [
// 	{ reservationID: 1, tableNumber: 14, isReserved: false },
// 	{ reservationID: 2, tableNumber: 11, isReserved: false },
// 	{ reservationID: 3, tableNumber: 5, isReserved: true },
// 	{ reservationID: 4, tableNumber: 7, isReserved: true },
// 	{ reservationID: 5, tableNumber: 21, isReserved: false },
// ];

router.get("/", async (req, res) => {
	res.send(await getReservation());
});

router.get("/:tableNumber", async (req, res) => {
	try {
		res.send(await getReservation(parseInt(req.params.tableNumber)));
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		const newReservation = { ...req.body };
		res.send(await addReservation(newReservation));
	} catch (error) {
		console.log(error);
	}
});

router.put("/:tableNumber", async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
});
// router.put("/:id", (req, res) => {
// 	const newReservation = { ...req.body };
// 	newReservation.reservationID = parseInt(req.params.id);
// 	const oldReservation = reservations.find(
// 		(r) => r.reservationID == newReservation.reservationID
// 	);
// 	if (oldReservation === undefined) {
// 		res.sendStatus(404).send();
// 	} else {
// 		for (const field in oldReservation) {
// 			oldReservation[field] = newReservation[field];
// 		}
// 		res.send(oldReservation);
// 	}
// });

// router.delete("/:id", (req, res) => {
// 	const deletingReservation = reservations.find(
// 		(r) => r.reservationID == parseInt(req.params.id)
// 	);
// 	if (deletingReservation === undefined) {
// 		res.status(404).send();
// 	} else {
// 		const index = reservations.indexOf(deletingReservation);
// 		reservations.splice(index, 1);
// 		res.send(
// 			`Reservation ${deletingReservation.reservationID} has been deleted`
// 		);
// 	}
// });
export default router;
