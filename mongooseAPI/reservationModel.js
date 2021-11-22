import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
	tableNumber: { type: Number, required: true },
	date: { type: String, required: true },
	hour: { type: String, required: true },
	customerID: { type: String },
	customerName: {
		type: String,
		trim: true,
		required: [true, "Please enter a name"],
	},
	numberOfGuest: {
		type: Number,
		required: [true, "Please select the number of guests"],
	},
	phoneNumber: {
		type: String,
		minlength: [10, "Phone number should have 10 digits"],
		maxlength: [10, "Phone number should only have 10 digits"],
	},
});

export const reservationCollection = mongoose.model(
	"reservations",
	ReservationSchema
);
