import React from "react";
import { Login } from "./Utility/Login";

export const AccountView = () => {
	const onLogin = (data) => {
		console.log(data);
	};
	return (
		<div>
			<Login onSuccess={onLogin} />
		</div>
	);
};
