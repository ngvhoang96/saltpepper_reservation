import axios from "axios";

export default function customerReducer(state, action) {
	switch (action.type) {
		case "action.login":
			return { ...action.payload, isLoggedIn: true };
		case "action.logout":
			return { isLoggedIn: false };
		case "action.addPayment":
			return { ...state, ...action.payload };
		case "action.addBooking":
			return {
				...state,
				reservation: [...state.reservation, action.payload],
			};
		default:
			return state || {};
	}
}

export async function actionFetchCustomerData(dispatch, getState) {
	//Fetch account info from the customer DB
	const { data: responseFromCustomerDB } = await axios.get(
		"/api/customer/access",
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"x-access-token": localStorage.getItem("_token"),
			},
		}
	);

	//Then fetch the booking info from reservation DB
	const responseFromReservationDB = await axios.get(
		"/api/reservation/" + responseFromCustomerDB.customer._id
	);

	dispatch({
		type: "action.login",
		payload: {
			...responseFromCustomerDB.customer,
			reservation: responseFromReservationDB.data,
		},
	});
}

export function addPaymentToCustomerReducer(newPayment) {
	return async function actionAddPayment(dispatch, getState) {
		const response = await axios.post("/api/customer/payment", newPayment);

		dispatch({
			type: "action.addPayment",
			payload: {
				points: response.data.points,
				payments: response.data.payments,
			},
		});
	};
}
