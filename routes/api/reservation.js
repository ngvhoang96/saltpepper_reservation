import express from "express";

import { reservationCollection } from "../../mongooseAPI/reservationModel.js";

const reservationRouter = express.Router();

//To get reservation made by one user, send a
//GET to /api/reservation/customerID
reservationRouter.get("/:customerID", (req, res) => {
	reservationCollection
		.find({ customerID: req.params.customerID })
		.select("-customerName -customerID -phoneNumber")
		.then((reservation) => {
			console.log("doc from db");
			console.log(reservation);
			res.json(reservation);
		});
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
