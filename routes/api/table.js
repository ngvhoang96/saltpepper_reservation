import express from "express";
import { tableCollection } from "../../mongooseAPI/tableModel.js";

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

export default table;
