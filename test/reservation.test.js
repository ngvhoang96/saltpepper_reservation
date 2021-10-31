import app from "../app.js";

import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should();
chai.use(chaiHttp);

const apiURL = "/api/reservation/";
const urlQueryKey = "tableNumber";
const urlQueryValue = "1";
const urlQueryValueFalsy = "99";

const itemRequiredProperties = ["tableNumber", "isReserved", "date", "hour"];
const setupData = {
	tableNumber: 1,
	isReserved: true,
	date: "2021-10-30T00:00:00.000Z",
	hour: "9:00",
};
const newData = {
	tableNumber: 9,
	isReserved: true,
	date: "2021-10-31T00:00:00.000Z",
	hour: "10:00",
};
const updatingData = { isReserved: true };
//Everything below this line is automated.
//Please edit data above only

//THE DATABASE HAS 4 MOST SQL COMMAND
//SELECT * FROM TABLE
//INSERT INTO TABLE VALUES(*)
//UPDATE TABLE SET * WHERE ID = ""
//DELETE FROM * WHERE ID = ""

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

		it("/:" + urlQueryKey + " returns an item", (done) => {
			chai
				.request(app)
				.get(apiURL + urlQueryValue)
				.end((err, res) => {
					res.should.have.status(200);
					itemRequiredProperties.map((property) => {
						res.body[0].should.have.property(property);
					});
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
					res.text.should.be.eql("Please include all properties");
					done();
				});
		});
	});

	describe("PUT", () => {
		it("/:" + urlQueryKey + " updates a valid item", (done) => {
			chai
				.request(app)
				.put(apiURL + urlQueryValue)
				.send(updatingData)
				.end((err, res) => {
					res.should.have.status("200");
					res.body.should.have
						.property(urlQueryKey)
						.eql(parseInt(urlQueryValue));
					for (const dataKey in updatingData) {
						res.body.should.have.property(dataKey).eql(updatingData[dataKey]);
					}
					done();
				});
		});

		it("/:" + urlQueryKey + " updates a non existed item", (done) => {
			chai
				.request(app)
				.put(apiURL + urlQueryValueFalsy)
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe("DELETE", () => {
		it("/:" + urlQueryKey + " removes an item", (done) => {
			chai
				.request(app)
				.delete(apiURL + urlQueryValue)
				.end((err, res) => {
					res.should.have.status("200");
					res.body.should.have
						.property(urlQueryKey)
						.eql(parseInt(urlQueryValue));
					done();
				});
		});

		it("/:" + urlQueryKey + " removes an invalid item", (done) => {
			chai
				.request(app)
				.delete(apiURL)
				.end((err, res) => {
					res.should.have.status("404");
					done();
				});
		});
	});
});
