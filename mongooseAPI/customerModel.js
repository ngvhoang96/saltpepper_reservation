import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customerName: { type: String, required: [true, "Please enter a name"] },
  email: { type: String, required: [true, "Please enter an email"], unique: true },
  password: { type: String, required: [true, "Please enter a password"], select: false },
  phoneNumber: { type: String },
  address: { type: String },
  billingAddress: { type: String },
  points: { type: Number },
});

export const customerCollection = mongoose.model("customers", customerSchema);
