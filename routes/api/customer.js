import express from "express";
import { customerCollection } from "../../mongooseAPI/customerModel.js";

import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../config.js";
import auth from "../../middleware/auth.js";

const customerRouter = express.Router();

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
							// console.log(error);
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

//Create a user
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
		.then((customer) => res.json(customer))
		.catch((error) => {
			const errors = Object.values(error.errors).map(
				(errorName) => errorName.message
			);
			res.status(400).send(errors);
		});
});

//Access account
//Send GET to /api/customer/access/
customerRouter.get("/access/", auth, (req, res) => {
	const { customer } = req;
	res.json(customer);
});

export default customerRouter;
