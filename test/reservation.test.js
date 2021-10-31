import app from "../app.js";

import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should();
const apiURL = "/api/reservation/";
//THE DATABASE HAS 4 MOST SQL COMMAND
//SELECT * FROM TABLE
//INSERT INTO TABLE VALUES(*)
//UPDATE TABLE SET * WHERE ID = ""
//DELETE FROM * WHERE ID = ""

chai.use(chaiHttp);

describe("Test /api/reservation", () => {
	before("setup data", () => {
		chai
			.request(app)
			.post(apiURL)
			.send({ tableNumber: 1, isReserved: true })
			.end();
	});

	describe("GET", () => {
		it("/ returns all reservations", (done) => {
			chai
				.request(app)
				.get(apiURL)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					done();
				});
		});

		it("/:tableNumber returns a table", (done) => {
			chai
				.request(app)
				.get(apiURL + "1")
				.end((err, res) => {
					res.should.have.status(200);
					res.body[0].should.have.property("_id");
					res.body[0].should.have.property("tableNumber");
					res.body[0].should.have.property("isReserved");
					done();
				});
		});
	});

	describe("POST", () => {
		it("/ with a valid format", (done) => {
			const newReservation = { tableNumber: 9, isReserved: true };
			chai
				.request(app)
				.post(apiURL)
				.send(newReservation)
				.end((err, res) => {
					res.body.should.have.property("_id");
					res.body.should.have.property("tableNumber");
					res.body.should.have.property("isReserved");
					done();
				});
		});

		it("/ with invalid data", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.send({ dummyVar: 1 })
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});

		it("/ with no data", (done) => {
			chai
				.request(app)
				.post(apiURL)
				.end((err, res) => {
					res.should.have.status(404);
					res.text.should.be.eql("Please include all properties");
					done();
				});
		});
	});

	describe("PUT", () => {
		it("/ updates valid table", (done) => {
			const newReservation = { isReserved: true };
			chai
				.request(app)
				.put(apiURL + "1")
				.send(newReservation)
				.end((err, res) => {
					res.should.have.status("200");
					res.body.should.have.property("tableNumber").eql(1);
					res.body.should.have.property("isReserved").eql(true);
					done();
				});
		});

		it("/ updates invalid table", (done) => {
			chai
				.request(app)
				.put(apiURL + "99")
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe("DELETE", () => {
		it("/:tableNumber removes a table", (done) => {
			chai
				.request(app)
				.delete(apiURL + "1")
				.end((err, res) => {
					res.should.have.status("200");
					res.body.should.have.property("tableNumber").eql(1);
					done();
				});
		});

		it("/ removes invalid table", (done) => {
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
