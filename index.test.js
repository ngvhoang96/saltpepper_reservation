import { expect } from "@jest/globals";
import request from "supertest";
import app from ".";

describe("express test", () => {
	test("GET / return welcome message", async () => {
		return request(app)
			.get("/")
			.expect(200)
			.then((response) => {
				expect(response.text).toBe("Hello");
			});
	});
});
