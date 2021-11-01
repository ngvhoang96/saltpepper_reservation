import express from "express";
import mongooseConnect from "./mongoClient.js";
import reservation from "./routes/api/reservation.js";
import path from "path";
const app = express();

await mongooseConnect();

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/reservation", reservation);

if (process.env.NODE_EVN === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

export default app;
