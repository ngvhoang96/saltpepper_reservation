import mongoose from "mongoose";
import { mongoURI } from "./config.js";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongooseConnect = async () => {
	await mongoose.disconnect();
	if (process.env.NODE_ENV === "test") {
		console.log("App running in test mode");
		const mockMongoose = await MongoMemoryServer.create({
			instance: {
				dbName: "reservation",
				dbPath: "/private/tmp/mongo-mem-1",
			},
		});
		await mongoose.connect(mockMongoose.getUri());
	} else {
		await mongoose.connect(mongoURI);
	}
};

export default mongooseConnect;
