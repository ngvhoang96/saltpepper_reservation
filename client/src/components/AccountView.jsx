import React, { useEffect, useState } from "react";
import { Login } from "./Utility/Login";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

export const AccountView = () => {
	return (
		<div>
			<Login />
		</div>
	);
};
//end

// export const AccountView = () => {
// 	const [customerData, setCustomerData] = useState({});

// 	useEffect(() => {
// 		if (
// 			Object.keys(customerData).length === 0 &&
// 			localStorage.getItem("_token")
// 		) {
// 			axios
// 				.get("/api/customer/access", {
// 					headers: {
// 						"Access-Control-Allow-Headers": "x-access-token",
// 						"x-access-token": localStorage.getItem("_token"),
// 					},
// 				})
// 				.then((response) => {
// 					setCustomerData(response.data.customer);
// 				})
// 				.catch((error) => {
// 					//setAppContext({ ...appContext, errorList: error.response.data });
// 				});
// 		}
// 	}, [customerData]);

// 	console.log(Object.keys(customerData).length);
// 	if (Object.keys(customerData).length === 0) {
// 		return <Login />;
// 	} else {
// 		return (
// 			<div>
// 				<h2>Hello {customerData["customerName"]}</h2>
// 				<Form>
// 					<Input value={customerData["_id"]} readOnly />
// 					<Input value={customerData["email"]} readOnly />
// 					<Input value={customerData["phoneNumber"]} readOnly />
// 				</Form>
// 				<hr />
// 				<Button
// 					onClick={() => {
// 						localStorage.removeItem("_token");
// 						setCustomerData({});
// 					}}
// 				>
// 					Log Out
// 				</Button>
// 			</div>
// 		);
// 	}
// };
