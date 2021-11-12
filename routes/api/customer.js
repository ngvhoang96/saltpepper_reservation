import express from "express";
import { customerCollection } from "../../mongooseAPI/customerModel.js";

const customerRouter = express.Router();

//Find a user by email and password
//Send to /api/customer/ a json object:
//{
//	"email": "...",
//	"password": "..."
//}
customerRouter.post("/get", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).send({ error: "Please include both email and password" });
	} else {
		customerCollection.find({ ...req.body }).then((customer) => {
			if (customer.length === 0) {
				res.status(404).json({ error: "Invalid Credential" });
			} else {
				res.json(customer);
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
// customerRouter.post("/", (req, res) => {
// 	customerCollection({ ...req.body }).save((error, response) => {
// 		if (error) {
// 			res.status(400).json({ error: error.message });
// 		} else {
// 			res.json({ ...response.body });
// 		}
// 	});
// });

export default customerRouter;
