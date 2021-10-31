import express from "express";
import {
	getReservation,
	addReservation,
	isValidReservation,
	updateReservation,
	deleteReservation,
} from "../../mongooseAPI/reservation.js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send(await getReservation());
});

router.get("/:tableNumber", async (req, res) => {
	try {
		const tableNumber = parseInt(req.params.tableNumber);
		if (await isValidReservation(tableNumber)) {
			res.send(await getReservation(tableNumber));
		} else {
			res.status(404).send();
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		const newReservation = { ...req.body };
		if (newReservation.tableNumber && newReservation.isReserved) {
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
