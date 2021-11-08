import express from "express";

import { reservationCollection } from "../../mongooseAPI/reservationModel.js";

const reservation = express.Router();

reservation.get("/", async (req, res) => {
	res.send(await reservationCollection.find());
});

//To create a new reservation
//send a POST request to api/reservation with the following json obj:
// "tableNumber":
// "date":
// "hour":
// "customerName":
// "numberOfGuest":
// "phoneNumber":

reservation.post("/", async (req, res) => {
	const newReservation = { ...req.body };
	res.send(await reservationCollection(newReservation).save());
});

// reservation.put("/:tableNumber", async (req, res) => {
// 	try {
// 		const tableNumber = parseInt(req.params.tableNumber);
// 		if (await isValidReservation(tableNumber)) {
// 			res.send(await updateReservation(tableNumber, { ...req.body }));
// 		} else res.status(404).send();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// reservation.delete("/:tableNumber", async (req, res) => {
// 	try {
// 		const tableNumber = parseInt(req.params.tableNumber);
// 		if (await isValidReservation(tableNumber)) {
// 			res.send(await deleteReservation(tableNumber));
// 		} else {
// 			res.status(404).send();
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// });
export default reservation;
