import mongoose from "mongoose";
import config from "./config.json";

const mongooseConnect = async () => {
	await mongoose.connect(config.mongoURI);
};

export default mongooseConnect;
