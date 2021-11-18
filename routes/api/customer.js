import express from "express";
import { customerCollection } from "../../mongooseAPI/customerModel.js";

import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../config.js";
import auth from "../../middleware/auth.js";

const customerRouter = express.Router();

//Access account
//Send GET to /api/customer/access/
customerRouter.get("/access/", auth, (req, res) => {
	const { customer } = req;
	res.json(customer);
});

//Request a LOGIN
//Send POST to /api/customer/login a json object:
//{
//	"email": "...",
//	"password": "..."
//}
customerRouter.post("/login", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).send({ error: "Please include both email and password" });
	} else {
		customerCollection.findOne({ ...req.body }).then((customer) => {
			if (customer === null || customer.length === 0) {
				res.status(404).json({ error: "Invalid Credential" });
			} else {
				jwt.sign(
					{ customer },
					jwtSecretKey,
					{ expiresIn: "1h" },
					(error, token) => {
						if (error) {
							res.status(401).send(["Login failed. Please try again!"]);
						} else {
							res.cookie("x-access-token", token, {
								httpOnly: true,
							});
							res.json({ customer, token });
						}
					}
				);
			}
		});
	}
});

//Create a customer account
//Send POST to /api/customer/ a json object:
//{
//	"customerName:" "..."
//	"email": "..."
//	"password": "..."
//	"phoneNumber": "..." (optional)
//}
customerRouter.post("/", (req, res) => {
	customerCollection({ ...req.body })
		.save()
		.then((customer) => {
			res.json(customer);
		})
		.catch((error) => {
			const errors = Object.values(error.errors).map((error) => error.message);
			res.status(400).send(errors);
		});
});

//Update a customer account
//Send PUT to /api/customer a JSON object
//{
//	id: "",
//	customerName: "",
//	email: "",
//	password: "", another password if customer wants to update password
//	phoneNumber: "", optional
//}
customerRouter.put("/", (req, res) => {
	//validate the data type send 400 with proper errors
	const error = customerCollection({ ...req.body }).validateSync();
	if (error) {
		const errors = Object.values(error.errors).map((error) => error.message);
		res.status(400).send(errors);
	} else {
		customerCollection.findById(req.body.id, (error, customerDoc) => {
			if (error) {
				//first make sure the customer exist
				res.status(404).send(["Customer not found"]);
			} else {
				//then update the customer with new data and return the document
				const { id, ...newCustomer } = req.body;
				customerDoc = { ...customerDoc.toObject(), ...newCustomer };
				customerCollection.findByIdAndUpdate(
					req.body.id,
					customerDoc,
					{ new: true },
					(error, doc) => {
						if (error) {
							res.status(500).send(error);
						} else {
							res.json(doc);
						}
					}
				);
			}
		});
	}
});

export default customerRouter;
