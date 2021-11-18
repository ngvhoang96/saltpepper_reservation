import app from "../app.js";

import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

let should = chai.should();
chai.use(chaiHttp);

const apiURL = "/api/table/";
// const urlQueryKey = "tableNumber";
// const urlQueryValue = "1";
// const urlQueryValueFalsy = "99";

const itemRequiredProperties = ["tableNumber", "capacity", "reservations"];
const setupData = {
	tableNumber: 1,
	capacity: 2,
	reservations: [
		{
			reservationID: new mongoose.Types.ObjectId(),
			date: "11-10-2021",
			hour: "9:00",
		},
	],
};
const newData = {
	tableNumber: 2,
	capacity: 4,
	reservations: [
		{
			reservationID: new mongoose.Types.ObjectId(),
			date: "11-10-2021",
			hour: "9:00",
		},
	],
};
const newReservation = {
	tableNumber: [1, 2],
	reservationIDString: "randomIDhere",
	date: "11-15-2021",
	hour: "6:00",
	requestType: "add",
};

const deletingReservation = {
	tableNumber: [1, 2],
	reservationIDString: "randomIDhere",
	date: "11-15-2021",
	hour: "6:00",
	requestType: "delete",
};

const faultyDeletingReservation = {
	requestType: "delete",
};
//Everything below this line is automated.
//Please edit data above only
//Tests:
//xGET return all the tables
//xPOST create a new table
//xPUT modifies reservations list of a table
//xDELETE we should not delete table

describe("Test " + apiURL, () => {
	before("setup data", () => {
		chai.request(app).post(apiURL).send(setupData).end();
	});

	describe("GET", () => {
		it("/ returns all items", (done) => {
			chai
				.request(app)
				.get(apiURL)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					done();
				});
		});
	});

	describe("POST", () => {
		it("/ create a new table", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send(newData)
				.end((err, res) => {
					itemRequiredProperties.map((property) =>
						res.body.should.have.property(property)
					);
					done();
				});
		});
	});

	describe("PUT", () => {
		it("/ add a new reservation to the list", (done) => {
			chai
				.request(app)
				.put(apiURL)
				.send(newReservation)
				.end((err, res) => {
					res.should.have.status("200");
					res.body.should.be.eql(["Success"]);
					done();
				});
		});

		it("/ delete a reservation from the list", (done) => {
			chai
				.request(app)
				.put(apiURL)
				.send(deletingReservation)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.eql(["Success"]);
					done();
				});
		});

		it("/ delete a wrong reservation from the list", (done) => {
			chai
				.request(app)
				.put(apiURL)
				.send(faultyDeletingReservation)
				.end((err, res) => {
					res.body.should.be.eql(["Failed"]);
					done();
				});
		});
	});
});
