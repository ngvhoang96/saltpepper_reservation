import mongoose from "mongoose";
import mongooseConnect from "../mongoClient.js";

const ReservationSchema = new mongoose.Schema({
	tableNumber: Number,
	isReserved: Boolean,
});
const reservationModel = mongoose.model("reservation", ReservationSchema);

export async function connect(req, res, next) {
	await mongooseConnect()
		.then(() => console.log("connect from reservations"))
		.catch((error) => console.error(error));
	next();
}

export async function getReservation(tableNumber) {
	try {
		if (tableNumber)
			return await reservationModel.find({ tableNumber: tableNumber });
		else return await reservationModel.find();
	} catch (error) {
		console.error(error);
	}
}

export async function isValidReservation(tableNumber) {
	try {
		const result = await reservationModel.find({ tableNumber: tableNumber });
		if (result.length > 0) return true;
		else return false;
	} catch (error) {
		console.log(error);
	}
}

export async function addReservation(reservation) {
	const newReservation = new reservationModel(reservation);
	try {
		return await newReservation.save();
	} catch (error) {
		console.log(error);
	}
}
export async function updateReservation(tableNumber, newReservation) {
	try {
		return await reservationModel.findOneAndUpdate(
			{ tableNumber: tableNumber },
			{ isReserved: newReservation.isReserved },
			{ new: true }
		);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteReservation(tableNumber) {
	try {
		return await reservationModel.findOneAndDelete({
			tableNumber: tableNumber,
		});
	} catch (error) {
		console.log(error);
	}
}
