import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
	customerName: { type: String, required: [true, "Please enter a name"] },
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		select: false,
	},
	phoneNumber: {
		type: String,
		minlength: [10, "Phone number should have 10 digits"],
		maxlength: [10, "Phone number should only have 10 digits"],
	},
	address: { type: String },
	billingAddress: { type: String },
	points: { type: Number },
});

export const customerCollection = mongoose.model("customers", customerSchema);
