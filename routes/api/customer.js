import express from "express";
import { customerCollection } from "../../mongooseAPI/customerModel.js";

import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../config.js";
import auth from "../../middleware/auth.js";
import bcrypt from "bcryptjs";

const customerRouter = express.Router();
const passwordHashKey = "spp4351";

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
		customerCollection.findOne({ email: email }).then((customer) => {
			if (
				customer === null || //customer not found
				customer.length === 0 || //customer not found
				!bcrypt.compareSync(password, customer.password) // customer found but password no match
			) {
				res.status(404).json({ error: "Invalid Credential" });
			} else {
				const { password, ...customerWithoutPassword } = customer.toObject();
				jwt.sign(
					{ customer: customerWithoutPassword },
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
	if (req.body.password === undefined) {
		res.status(400).send(["Please enter a password"]);
	} else {
		//encrypt password then apply that to newCustomer
		const salt = bcrypt.genSaltSync(10);
		const passwordAfterEncryption = bcrypt.hashSync(req.body.password, salt);
		const newCustomer = { ...req.body, password: passwordAfterEncryption };
		//then save newCustomer to the DB
		customerCollection(newCustomer)
			.save()
			.then((customer) => {
				const { password, ...customerWithoutPassword } = customer.toObject();
				res.json(customerWithoutPassword);
			})
			.catch((error) => {
				if (error.code === 11000) {
					res.status(400).send(["Email is already taken"]);
				}
				const errors = Object.values(error.errors).map(
					(error) => error.message
				);
				res.status(400).send(errors);
			});
	}
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

//add a new payment
//send a POST to /api/customer/payment with a Json object
// {
//	customerID: ObjectID,
// 	amout: 10,
// 	date: "11-19-2021",
// 	description: "table 1 and 2",
// }
customerRouter.post("/payment", (req, res) => {
	const { customerID, amount, date, description } = req.body;
	customerCollection.findById(customerID).then((customer) => {
		if (customer !== null) {
			customerCollection.findByIdAndUpdate(
				customerID,
				{
					$push: {
						payments: { amount: amount, date: date, description: description },
					},
					$inc: {
						points: 100,
					},
				},
				{ new: true },
				(error, doc) => {
					if (error) {
						res.status(400).send(["Cannot add payment"]);
					} else {
						res.json(doc);
					}
				}
			);
		} else {
			res.status(404).send(["Cannot find customer"]);
		}
	});
});

export default customerRouter;
