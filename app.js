import express from "express";
import history from "connect-history-api-fallback";
import path from "path";
import reservation from "./routes/api/reservation.js";
import table from "./routes/api/table.js";
import mongooseConnect from "./mongoClient.js";

const app = express();

await mongooseConnect();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/reservation/", reservation);
app.use("/api/table", table);

app.use(history());

if (process.env.NODE_ENV === "production") {
	console.log("App running in production mode");
	app.use(express.static("client/build/"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

export default app;
