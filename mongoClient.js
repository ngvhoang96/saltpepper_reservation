import mongoose from "mongoose";
import config from "./config.json";

const mongooseConnect = async () => {
	mongoose.connect(config.mongoURI, () => console.log("connected to mongoDB"));
};

export default mongooseConnect;
