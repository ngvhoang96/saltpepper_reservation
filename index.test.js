import { expect } from "@jest/globals";
import request from "supertest";
import app from ".";

//THE DATABASE HAS 4 MOST SQL COMMAND
//SELECT * FROM TABLE
//INSERT INTO TABLE VALUES(*)
//UPDATE TABLE SET * WHERE ID = ""
//DELETE FROM * WHERE ID = ""

describe("Test SELECT FROM TABLE", () => {
	test("GET / return welcome message", async () => {
		return request(app)
			.get("/")
			.then((response) => {
				expect(response.text).toBe("Hello");
			});
	});

	test("GET /API/reservations return in JSON format", async () => {
		return request(app)
			.get("/API/reservations/")
			.then((response) => {
				expect(response.type).toBe("application/json");
			});
	});

	test("GET /API/reservations return array with table number and isReserved boolean", async () => {
		return request(app)
			.get("/API/reservations/")
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

	test("GET /API/reservations/id return a reservation", async () => {});
});

describe("Test INSERT INTO TABLE VALUES", () => {
	test("POST /API/reservations/ require the body with proper format no ID", async () => {});

	test("POST /API/reservations/ create a new reservation and return new ID", async () => {});
});

describe("Test UPDATE TABLE WHERE ID", () => {
	test("PUT /API/reservation/id update the reservation", async () => {});

	test("PUT /API/reservation/id returns 404 on invalid ID", async () => {});
});

describe("Test DELETE FROM TABLE WHERE ID", () => {
	test("DELETE /API/reservation/id removes the reservation", async () => {});

	test("DELETE API/reservation/id returns 404 on invalid ID", async () => {});
});
