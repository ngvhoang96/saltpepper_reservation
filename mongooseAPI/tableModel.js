import mongoose from "mongoose";

const TableReservationSchema = new mongoose.Schema({
	reservationID: mongoose.Types.ObjectId,
	date: String,
	hour: String,
});

const TableSchema = new mongoose.Schema({
	tableNumber: Number,
	capacity: Number,
	reservations: [TableReservationSchema],
});

export const tableCollection = mongoose.model("tables", TableSchema);
