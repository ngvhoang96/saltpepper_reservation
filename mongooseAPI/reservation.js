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
export async function getReservation(id) {
	try {
		if (id) return await reservationModel.find({ tableNumber: id });
		else return await reservationModel.find();
	} catch (error) {
		console.error(error);
	}
}
// export async function checkGenre(id) {
// 	try {
// 		const result = await genresModel.find({ _id: id });
// 		if (result.length > 0) return true;
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	return false;
// }
export async function addReservation(reservation) {
	const newReservation = new reservationModel(reservation);
	try {
		return await newReservation.save();
	} catch (error) {
		console.log(error);
	}
}
// export async function updateGenre(id, genre) {
// 	try {
// 		return await genresModel.findByIdAndUpdate(
// 			id,
// 			{ $set: { name: genre.name } },
// 			{ new: true }
// 		);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// export async function deleteGenre(id) {
// 	try {
// 		return await genresModel.findByIdAndRemove(id);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
