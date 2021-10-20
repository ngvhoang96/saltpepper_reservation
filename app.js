import express from "express";
import reservation from "./routes/api/reservation.js";

const app = express();

app.use(express.json());
app.use("/api/reservation", reservation);

export default app;
