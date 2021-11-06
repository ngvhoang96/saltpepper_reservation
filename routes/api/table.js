import express from "express";
import { tableCollection } from "../../mongooseAPI/tableModel.js";
import mongoose from "mongoose";

const table = express.Router();

table.get("/", async (req, res) => {
	const query = { ...req.body };
	res.json(await tableCollection.find(query));
});

table.get("/:tableNumber", async (req, res) => {
	const tableNumber = parseInt(req.params.tableNumber);
	res.json(await tableCollection.find({ tableNumber: tableNumber }));
});

//should not be adding more tables
// table.post("/", async (req, res) => {
// 	const newTable = { ...req.body };
// 	const response = await tableCollection(newTable).save();
// 	res.send(response);
// });

//To add, update, or delete a reservation from a table
// you need to send a PUT to api with the following json body
//"reservationID": "61863af2b8a04a4ba9f6ebb4" (the string inside the objectID)
//"tableNumber":
//"date":
//"hour":
//"requestType": "update" or "delete" or "add"

table.put("/", async (req, res) => {
	const { requestType, tableNumber, date, hour, reservationID } = {
		...req.body,
	};
	console.log("request type: " + requestType);
	const reservationObjID = mongoose.Types.ObjectId(reservationID);

	if (requestType === "add") {
		res.json(
			await tableCollection.updateOne(
				{ tableNumber: tableNumber },
				{
					$push: {
						reservations: {
							reservationID: reservationObjID,
							date: date,
							hour: hour,
						},
					},
				},
				{ upsert: true }
			)
		);
	} else {
		//requestType can now either be delete or update
		//in the case we update a reservation, we delete and then insert the updated one
		const responseDelete = await tableCollection.updateOne(
			{ "reservations.reservationID": reservationObjID },
			{ $pull: { reservations: { reservationID: reservationObjID } } }
		);

		if (requestType === "delete") {
			res.json(responseDelete);
		} else if (requestType === "update") {
			res.json(
				await tableCollection.updateOne(
					{ tableNumber: tableNumber },
					{
						$push: {
							reservations: {
								reservationID: reservationObjID,
								date: date,
								hour: hour,
							},
						},
					}
				)
			);
		} else {
			res.status(400).send();
		}
	}
});

export default table;
