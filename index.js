import express from "express";

const app = express();
const reservavtions = [
	{ reservationID: 1, tableNumber: 14, isReserved: false },
];

app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/API/reservations/", (req, res) => {
	res.send(reservavtions);
});

export default app;
