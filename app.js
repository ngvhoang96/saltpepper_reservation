import express from "express";
import history from "connect-history-api-fallback";
import path from "path";
import reservation from "./routes/api/reservation.js";
import mongooseConnect from "./mongoClient.js";

const app = express();

await mongooseConnect();
app.use(express.json());
app.use(express.urlencoded());
app.use(history());

app.use("/api/reservation/", reservation);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build/"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

export default app;
