import { expect } from "@jest/globals";
import request from "supertest";
import app from "../../app";
import mongoClient from "../../mongoClient";

//THE DATABASE HAS 4 MOST SQL COMMAND
//SELECT * FROM TABLE
//INSERT INTO TABLE VALUES(*)
//UPDATE TABLE SET * WHERE ID = ""
//DELETE FROM * WHERE ID = ""

describe("Test SELECT FROM TABLE", () => {
	beforeAll(async () => {
		mongoClient.connect();
	});
	test("GET /api/reservations returns in JSON format", async () => {
		return request(app)
			.get("/api/reservation/")
			.then((response) => {
				expect(response.type).toBe("application/json");
			});
	});

	test("GET /api/reservations returns array with table number and isReserved boolean", async () => {
		return request(app)
			.get("/api/reservation/")
			.then((response) => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							reservationID: expect.any(Number),
							tableNumber: expect.any(Number),
							isReserved: expect.any(Boolean),
						}),
					])
				);
			});
	});

	test("GET /api/reservations/id returns a reservation", async () => {
		return request(app)
			.get("/api/reservation/1")
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						reservationID: 1,
						tableNumber: expect.any(Number),
						isReserved: expect.any(Boolean),
					})
				);
			});
	});
});

describe("Test INSERT INTO TABLE VALUES", () => {
	test("POST /api/reservations/ with valid format", async () => {
		const newReservation = { tableNumber: 10, isReserved: true };
		return request(app)
			.post("/api/reservation/")
			.send(newReservation)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						reservationID: expect.any(Number),
						tableNumber: expect.any(Number),
						isReserved: expect.any(Boolean),
					})
				);
			});
	});

	test("POST /api/reservation/ with no data", async () => {
		return request(app).post("/api/reservation/").expect(400);
	});

	test("POST /api/reservation/ with data in wrong format", async () => {
		const newReservation = { tableNumber: 10 };
		return request(app)
			.post("/api/reservation/")
			.send(newReservation)
			.expect(400)
			.then((response) => {
				expect(response.text).toBe(
					"Please include both tableNumber and isReserved"
				);
			});
	});
});

describe("Test UPDATE TABLE WHERE ID", () => {
	test("PUT /api/reservation/id updates the reservation", async () => {
		const newReservation = { tableNumber: 14, isReserved: true };
		return request(app)
			.put("/api/reservation/1")
			.send(newReservation)
			.then((response) => {
				expect(response.body).toEqual({
					reservationID: 1,
					tableNumber: 14,
					isReserved: true,
				});
			});
	});

	test("PUT /api/reservation/id returns 404 on invalid ID", async () => {
		return request(app).put("/api/reservation/5").expect(404);
	});
});

describe("Test DELETE FROM TABLE WHERE ID", () => {
	test("DELETE /api/reservation/id removes the reservation", async () => {
		return request(app)
			.delete("/api/reservation/1")
			.then((response) => {
				expect(response.text).toBe("Reservation 1 has been deleted");
			});
	});

	test("DELETE /api/reservation/id returns 404 on invalid ID", async () => {
		return request(app).delete("/api/reservation/9").expect(404);
	});
});
