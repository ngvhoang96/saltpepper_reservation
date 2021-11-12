import express from "express";
import { tableCollection } from "../../mongooseAPI/tableModel.js";
import mongoose from "mongoose";

const tableRouter = express.Router();

//Get all the tables
tableRouter.get("/", (req, res) => {
	tableCollection.find().then((tables) => res.json(tables));
});

// tableRouter.get("/:tableNumber", async (req, res) => {
// 	const tableNumber = parseInt(req.params.tableNumber);
// 	res.json(await tableCollection.find({ tableNumber: tableNumber }));
// });

//To add, update, or delete a reservation from a table
// you need to send a PUT to api with the following json body
//"reservationID": "61863af2b8a04a4ba9f6ebb4" (the string inside the objectID)
//"tableNumber":
//"date":
//"hour":
//"requestType": "update" or "delete" or "add"
tableRouter.put("/", async (req, res) => {
	const { requestType, tableNumber, date, hour, reservationIDString } =
		req.body;

	const reservationID = mongoose.Types.ObjectId(reservationIDString);

	if (requestType === "add") {
		res.json(
			await tableCollection.updateOne(
				{ tableNumber },
				{
					$push: { reservations: { reservationID, date, hour } },
				},
				{ upsert: true }
			)
		);
	} else {
		//requestType can now either be delete or update
		//in the case we update a reservation, we delete and then insert the updated one
		const responseDelete = await tableCollection.updateOne(
			{ "reservations.reservationID": reservationID },
			{ $pull: { reservations: { reservationID } } }
		);

		if (requestType === "delete") {
			res.json(responseDelete);
		} else if (requestType === "update") {
			res.json(
				await tableCollection.updateOne(
					{ tableNumber },
					{
						$push: {
							reservations: { reservationID, date, hour },
						},
					}
				)
			);
		} else {
			res.status(400).send();
		}
	}
});

export default tableRouter;
