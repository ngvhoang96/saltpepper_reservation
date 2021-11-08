import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
	tableNumber: Number,
	date: String,
	hour: String,
	customerID: Number,
	customerName: String,
	numberOfGuest: Number,
	phoneNumber: String,
});

export const reservationCollection = mongoose.model(
	"reservations",
	ReservationSchema
);
