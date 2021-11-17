import axios from "axios";

export default function customerReducer(state, action) {
	switch (action.type) {
		case "action.login":
			return { ...action.payload, isLoggedIn: true };
		case "action.logout":
			return { isLoggedIn: false };
		default:
			return state || {};
	}
}

export async function actionLogin(dispatch, getState) {
	const response = await axios.get("/api/customer/access", {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"x-access-token": localStorage.getItem("_token"),
		},
	});
	dispatch({ type: "action.login", payload: response.data.customer });
}
