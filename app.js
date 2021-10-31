import express from "express";
import mongooseConnect from "./mongoClient.js";
import reservation from "./routes/api/reservation.js";

const app = express();

await mongooseConnect();

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/reservation", reservation);

export default app;
