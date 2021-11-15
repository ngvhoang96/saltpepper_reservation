import React, { useEffect, useState } from "react";
import { Login } from "./Utility/Login";
import axios from "axios";
import { AccountInfo } from "./AccountInfo";
import { AccountContext } from "../contextProvider/AccountContext";
import { NotifyPanel } from "./Utility/NotifyPanel";

export const AccountView = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (isLoggedIn || localStorage.getItem("_token")) {
			axios
				.get("/api/customer/access", {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"x-access-token": localStorage.getItem("_token"),
					},
				})
				.then((response) => {
					const { customer } = response.data;
					setState({ ...state, ...customer });
				})
				.catch((error) => console.log(error.response.data));
		}
	}, [isLoggedIn]);

	const handleLoggedIn = () => {
		setIsLoggedIn(true);
	};

	const handleLoggedout = (event) => {
		event.preventDefault();
		localStorage.removeItem("_token");
		props.history.push("/");
	};

	const [state, setState] = useState({ errorList: [] });

	if (localStorage.getItem("_token")) {
		return (
			<AccountContext.Provider value={[state, setState]}>
				<NotifyPanel>{state.errorList}</NotifyPanel>
				<AccountInfo onLoggedOut={handleLoggedout} />
			</AccountContext.Provider>
		);
	} else {
		return <Login onLoggedIn={handleLoggedIn} />;
	}
};
