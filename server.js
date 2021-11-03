import app from "./app.js";
import mongooseConnect from "./mongoClient.js";

await mongooseConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running...${PORT}`);
});
