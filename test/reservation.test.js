import app from "../app.js";

import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should();
chai.use(chaiHttp);

const apiURL = "/api/reservation/";
const urlQueryKey = "tableNumber";
const urlQueryValue = "1";
const urlQueryValueFalsy = "99";

const itemRequiredProperties = [
	"tableNumber",
	"date",
	"hour",
	"customerName",
	"numberOfGuest",
];
const setupData = {
	tableNumber: 1,
	date: "2021-10-30T00:00:00.000Z",
	hour: "9:00",
	customerName: "andrew",
	numberOfGuest: 3,
};
const newData = {
	tableNumber: 9,
	date: "2021-10-31T00:00:00.000Z",
	hour: "10:00",
	customerName: "andrew",
	numberOfGuest: 3,
};
//Everything below this line is automated.
//Please edit data above only
//Tests:
//xGET return all reservations
//xPOST create new reservation
//-DELETE delete a reservation

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
		it("/ create new item with a valid format", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send(newData)
				.end((err, res) => {
					for (const dataKey in newData) {
						res.body.should.have.property(dataKey).eql(newData[dataKey]);
					}
					done();
				});
		});

		it("/ create new item with invalid data", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send({ dummyVar: 1 })
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});

		it("/ create item with no data", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.end((err, res) => {
					res.should.have.status(400);
					res.text.should.include("Please select the number of guests");
					done();
				});
		});
	});
});
