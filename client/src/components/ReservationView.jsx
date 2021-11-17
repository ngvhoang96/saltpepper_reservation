import React, { useEffect, useState } from "react";
import { TableView } from "./TableView";
import axios from "axios";
import { NewReservationForm } from "./NewReservationForm";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { DoneReservation } from "./DoneReservation";
import { NotifyPanel } from "./Utility/NotifyPanel";
import { useSelector } from "react-redux";

export const ReservationView = () => {
	//redux
	const customerReducer = useSelector((state) => state.customerReducer);
	//
	const [state, setState] = useState({ viewMode: "TableView" });

	useEffect(() => {
		if (customerReducer) setState((s) => ({ ...s, ...customerReducer }));
	}, [customerReducer]);

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
						// setAppContext({ ...appContext, errorList: [] });
					})
					.catch(({ response }) => {
						setState({
							...state,
							notify: { type: "danger", msg: response.data },
						});
					});
			})
			.catch(({ response }) => {
				setState({ ...state, notify: { type: "danger", msg: response.data } });
			});
	};

	return (
		<ReservationContext.Provider value={[state, setState]}>
			<NotifyPanel type={state.notify?.type}>{state.notify?.msg}</NotifyPanel>
			<TableView />
			<NewReservationForm handleSubmit={handleSubmitReservation} />
			<DoneReservation />
		</ReservationContext.Provider>
	);
};
