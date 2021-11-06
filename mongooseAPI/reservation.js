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

export async function getAllReservation(query) {
	try {
		return await reservationCollection.find(query);
	} catch (error) {
		console.error(error);
	}
}
// export async function getReservationByTableNumber(tableNumber) {
// 	try {
// 		if (tableNumber)
// 			return await reservationModel.find({ tableNumber: tableNumber });
// 		else return await reservationModel.find();
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

export async function isValidReservation(tableNumber) {
	try {
		const result = await reservationCollection.find({
			tableNumber: tableNumber,
		});
		if (result.length > 0) return true;
		else return false;
	} catch (error) {
		console.log(error);
	}
}

export async function addReservation(reservation) {
	const newReservation = new reservationCollection(reservation);
	try {
		return await newReservation.save();
	} catch (error) {
		console.log(error);
	}
}
export async function updateReservation(tableNumber, newReservation) {
	try {
		return await reservationCollection.findOneAndUpdate(
			{ tableNumber: tableNumber },
			{
				isReserved: newReservation.isReserved,
				customerName: newReservation.customerName,
			},
			{ new: true }
		);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteReservation(tableNumber) {
	try {
		return await reservationCollection.findOneAndDelete({
			tableNumber: tableNumber,
		});
	} catch (error) {
		console.log(error);
	}
}
