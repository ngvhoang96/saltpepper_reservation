import axios from "axios";

export default function customerReducer(state, action) {
	switch (action.type) {
		case "action.login":
			return { ...action.payload, isLoggedIn: true };
		case "action.logout":
			return { isLoggedIn: false };
		case "action.addPayment":
			return { ...state, points: action.payload };
		default:
			return state || {};
	}
}

export async function actionFetchCustomerData(dispatch, getState) {
	const response = await axios.get("/api/customer/access", {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"x-access-token": localStorage.getItem("_token"),
		},
	});
	dispatch({ type: "action.login", payload: response.data.customer });
}

export function addPaymentToCustomerReducer(newPayment) {
	return async function actionAddPayment(dispatch, getState) {
		const response = await axios.post("/api/customer/payment", newPayment);

		console.log(response.data);
		dispatch({
			type: "action.addPayment",
			payload: response.data.points,
		});
	};
}
