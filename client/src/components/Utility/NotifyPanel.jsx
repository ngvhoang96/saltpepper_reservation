import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";

//Give this a list of error messages and it will display the toast
//Usage:
//const errors = ["erorr1", "error2", "another error"];
//<NotifyPanel>{errors}</NotifyPanel>
export const NotifyPanel = ({ type, children }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (children) setMessages(children);
	}, [children]);

	const sliceThis = (item) => {
		const newMessages = messages.filter((msg) => msg !== item);
		setMessages(newMessages);
	};

	return (
		<>
			{messages.map((msg) => {
				return (
					<ShowToast
						key={msg}
						message={msg}
						type={type ? type : "danger"}
						destroy={sliceThis}
					/>
				);
			})}
		</>
	);
};

const ShowToast = ({ message, destroy, type }) => {
	return (
		<Alert color={type} toggle={(e) => destroy(message)}>
			{message}
		</Alert>
	);
};
