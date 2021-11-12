import React from "react";
import { Login } from "./Utility/Login";
import axios from "axios";

export const AccountView = () => {
	const onLogin = (data) => {
		console.log(data);
	};

	axios
		.get("/api/customer/access", {
			headers: {
				"Access-Control-Allow-Headers": "x-access-token",
				"x-access-token": localStorage.getItem("_token"),
			},
		})
		.then((response) => {
			console.log(response.data.customer);
		})
		.catch((error) => {
			console.log(error.response.data);
		});

	return (
		<div>
			<Login onSuccess={onLogin} />
		</div>
	);
};
