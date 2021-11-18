import express, { response } from "express";
import { tableCollection } from "../../mongooseAPI/tableModel.js";
import mongoose from "mongoose";

const tableRouter = express.Router();

//Get all the tables
tableRouter.get("/", (req, res) => {
	tableCollection.find().then((tables) => res.json(tables));
});

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
		await tableCollection.updateMany(
			{ tableNumber },
			{
				$push: { reservations: { reservationID, date, hour } },
			},
			{ upsert: true },
			(error, result) => {
				if (error) {
					res.status(400).send([error]);
				} else {
					res.send([
						result.modifiedCount > 0 && result.matchedCount > 0
							? "Success"
							: "Failed",
					]);
				}
			}
		);
	} else {
		//requestType can now either be delete or update
		//in the case we update a reservation, we delete and then insert the updated one
		const responseDelete = await tableCollection.updateMany(
			{ "reservations.reservationID": reservationID },
			{ $pull: { reservations: { reservationID } } }
		);

		if (requestType === "delete") {
			res.send([
				responseDelete.modifiedCount > 0 && responseDelete.matchedCount > 0
					? "Success"
					: "Failed",
			]);
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
			res.status(400).send(["Failed"]);
		}
	}
});

//To create a new table, send a POST to /api/table/ with a json object
//{
//	tableNumber: number,
//	capacity: number,
//	reservation: [], empty since new table has no reservations
//}
tableRouter.post("/", (req, res) => {
	const newTable = { ...req.body };
	tableCollection(newTable)
		.save()
		.then((table) => res.json(table))
		.catch((error) => res.status(400).send(error.errors));
});

export default tableRouter;
