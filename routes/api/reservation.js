import express from "express";

import { reservationCollection } from "../../mongooseAPI/reservationModel.js";

const reservationRouter = express.Router();

reservationRouter.get("/", async (req, res) => {
	reservationCollection.find().then((reservation) => res.json(reservation));
});

//To create a new reservation
//send a POST request to api/reservation with the following json obj:
// "tableNumber":
// "date":
// "hour":
// "customerName":
// "numberOfGuest":
// "phoneNumber":
reservationRouter.post("/", (req, res) => {
	reservationCollection({ ...req.body })
		.save()
		.then((reservation) => res.json(reservation))
		.catch((error) => {
			const errors = Object.values(error.errors).map(
				(errorName) => errorName.message
			);

			res.status(400).send(errors);
		});
});

export default reservationRouter;
