import express from "express";
import {
	getAllReservation,
	getReservationByTableNumber,
	addReservation,
	isValidReservation,
	updateReservation,
	deleteReservation,
} from "../../mongooseAPI/reservation.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const query = { ...req.query };
	res.send(await getAllReservation(query));
});

router.get("/:tableNumber", async (req, res) => {
	try {
		const tableNumber = parseInt(req.params.tableNumber);
		if (await isValidReservation(tableNumber)) {
			res.send(await getReservationByTableNumber(tableNumber));
		} else {
			res.status(404).send();
		}
	} catch (error) {
		console.log(error);
	}
});

router.get("/");

router.post("/", async (req, res) => {
	try {
		const newReservation = { ...req.body };
		if (
			newReservation.tableNumber !== null &&
			newReservation.isReserved !== null
		) {
			res.send(await addReservation(newReservation));
		} else {
			res.status(400).send("Please include all properties");
		}
	} catch (error) {
		console.log(error);
	}
});

router.put("/:tableNumber", async (req, res) => {
	try {
		const tableNumber = parseInt(req.params.tableNumber);
		if (await isValidReservation(tableNumber)) {
			res.send(await updateReservation(tableNumber, { ...req.body }));
		} else res.status(404).send();
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:tableNumber", async (req, res) => {
	try {
		const tableNumber = parseInt(req.params.tableNumber);
		if (await isValidReservation(tableNumber)) {
			res.send(await deleteReservation(tableNumber));
		} else {
			res.status(404).send();
		}
	} catch (error) {
		console.log(error);
	}
});
export default router;
