import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
	customerName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, select: false },
	phoneNumber: { type: String },
});

export const customerCollection = mongoose.model("customers", customerSchema);
