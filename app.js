import express from "express";
import history from "connect-history-api-fallback";
import path from "path";
import mongooseConnect from "./mongoClient.js";
import reservationRouter from "./routes/api/reservation.js";
import tableRouter from "./routes/api/table.js";
import customerRouter from "./routes/api/customer.js";

const app = express();

await mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/reservation/", reservationRouter);
app.use("/api/table/", tableRouter);
app.use("/api/customer/", customerRouter);

app.use(history());

if (process.env.NODE_ENV === "production") {
	console.log("App running in production mode");
	app.use(express.static("client/build/"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

export default app;
