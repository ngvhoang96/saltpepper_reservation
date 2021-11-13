import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";

//Give this a list of error messages and it will display the toast
//Usage:
//const errors = ["erorr1", "error2", "another error"];
//<NotifyPanel>{errors}</NotifyPanel>
export const NotifyPanel = ({ children }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setMessages(children);
	}, [children]);

	const sliceThis = (item) => {
		const newMessages = messages.filter((msg) => msg !== item);
		setMessages(newMessages);
	};

	return (
		<>
			{messages.map((msg) => {
				return <ShowToast key={msg} message={msg} destroy={sliceThis} />;
			})}
		</>
	);
};

const ShowToast = ({ message, destroy }) => {
	return (
		<Alert color="danger" toggle={(e) => destroy(message)}>
			{message}
		</Alert>
	);
};
