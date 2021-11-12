import React, { useState } from "react";
import { TableView } from "./TableView";
import axios from "axios";
import { NewReservationForm } from "./NewReservationForm";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { DoneReservation } from "./DoneReservation";
import { NotifyPanel } from "./Utility/NotifyPanel";

export const ReservationView = () => {
	const [state, setState] = useState({ viewMode: "TableView" });
	const [errorList, setErrorList] = useState([]);

	const handleSubmitReservation = async (event) => {
		event.preventDefault();
		const {
			selectedTable,
			selectedDate,
			selectedHour,
			customerName,
			numberOfGuest,
			phoneNumber,
		} = state;

		//First add the new reservation to the reservation DB
		const newReservation = {
			tableNumber: selectedTable,
			date: selectedDate,
			hour: selectedHour,
			customerName: customerName,
			numberOfGuest: numberOfGuest,
			phoneNumber: phoneNumber,
		};

		axios
			.post("/api/reservation/", newReservation)
			.then((response) => {
				//Then add that reservation to the specific table because
				//mongoDB does not allow relationship like relational DB.
				const updateTableData = {
					reservationIDString: response.data._id,
					tableNumber: selectedTable,
					date: selectedDate,
					hour: selectedHour,
					requestType: "add",
				};
				axios
					.put("/api/table/", updateTableData)
					.then(() => {
						setState({ ...state, viewMode: "DoneReservation" });
						setErrorList([]);
					})
					.catch(({ response }) => setErrorList(response.data));
			})
			.catch(({ response }) => {
				setErrorList(response.data);
			});
	};

	return (
		<>
			<NotifyPanel>{errorList}</NotifyPanel>
			<ReservationContext.Provider value={[state, setState]}>
				<TableView />
				<NewReservationForm handleSubmit={handleSubmitReservation} />
				<DoneReservation />
			</ReservationContext.Provider>
		</>
	);
};
