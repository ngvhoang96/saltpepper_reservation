import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config.js";

const auth = (req, res, next) => {
	const token = req.header("x-access-token");

	if (!token) {
		return res.status(401).send(["Unauthorized access"]);
	} else {
		try {
			req.customer = jwt.verify(token, jwtSecretKey);
			return next();
		} catch (error) {
			return res.status(400).send(["Please log in again"]);
		}
	}
};

export default auth;
