import app from "../app.js";

import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

let should = chai.should();
chai.use(chaiHttp);

const apiURL = "/api/customer/";

const itemRequiredProperties = ["customerName", "email"];
const setupData = {
	customerName: "andrew",
	email: "nomail@mail.com",
	password: "123",
};
let setupDataID;

const newData = {
	customerName: "name 2",
	email: "mail2@ggg.com",
	password: "567",
};

const updatingData = {
	customerName: "andrew nguyen",
	email: "nomail@mail.com",
	password: "1234",
};
//Everything below this line is automated.
//Please edit data above only
//Tests:
//xPOST create an account, login,
//xPUT update customer info
//xGET skipped test due to auth dependencies
//xDELETE app doesn't require remove a user

describe("Test " + apiURL, () => {
	before("setup data", () => {
		chai
			.request(app)
			.post(apiURL)
			.send(setupData)
			.end((err, res) => (setupDataID = res.body._id));
	});

	describe("POST", () => {
		it("/ create a new customer", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send(newData)
				.end((err, res) => {
					res.should.have.status(200);
					["customerName", "email"].forEach((property) => {
						res.body.should.have.property(property);
					});
					done();
				});
		});

		it("/ create a new customer with invalid data", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send({ dummyVar: 1 })
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.include("Please enter a password");
					done();
				});
		});

		it("/ create a customer with duplicate email", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send(newData)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.include("Email is already taken");
					done();
				});
		});

		it("/login login successful generate a token", (done) => {
			chai
				.request(app)
				.post(apiURL + "login")
				.send(setupData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("token");
					done();
				});
		});

		it("/login login with missing data", (done) => {
			chai
				.request(app)
				.post(apiURL + "login")
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.include(
						"Please include both email and password"
					);
					done();
				});
		});

		it("/login login with invalid data", (done) => {
			chai
				.request(app)
				.post(apiURL + "login")
				.send({ email: "haha@mail.com", password: "2" })
				.end((err, res) => {
					res.should.have.status(404);
					res.body.error.should.include("Invalid Credential");
					done();
				});
		});

		it("/payment add a new payment", (done) => {
			const newPayment = {
				customerID: setupDataID,
				amount: 10,
				date: "11-19-2021",
				description: "table 1 and 2",
			};
			chai
				.request(app)
				.post(apiURL + "payment")
				.send(newPayment)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("points").eql(100);
					done();
				});
		});

		it("/payment add an invalid payment", (done) => {
			chai
				.request(app)
				.post(apiURL + "payment")
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe("PUT", () => {
		it("/ update a customer", (done) => {
			const updatingDataWithID = {
				...updatingData,
				id: mongoose.Types.ObjectId(setupDataID),
			};

			chai
				.request(app)
				.put(apiURL)
				.send(updatingDataWithID)
				.end((err, res) => {
					res.should.have.status("200");
					itemRequiredProperties.map((property) => {
						res.body.should.have.property(property).eql(updatingData[property]);
					});
					done();
				});
		});

		it("/ update a customer with wrong ID", (done) => {
			const updatingDataWithFaultyID = { ...updatingData, id: "not valid" };

			chai
				.request(app)
				.put(apiURL)
				.send(updatingDataWithFaultyID)
				.end((err, res) => {
					res.should.have.status("404");
					res.body.should.include("Customer not found");
					done();
				});
		});
	});
});
