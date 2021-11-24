import React, { useEffect, useState } from "react";
import { TableView } from "./TableView";
import axios from "axios";
import { NewReservationForm } from "./NewReservationForm";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { DoneReservation } from "./DoneReservation";
import { FinalizingView } from "./FinalizingView";
import { NotifyPanel } from "./Utility/NotifyPanel";
import { useDispatch, useSelector } from "react-redux";

export const ReservationView = () => {
	//redux
	const customerReducer = useSelector((state) => state.customerReducer);
	const dispatch = useDispatch();
	//
	const [state, setState] = useState({ viewMode: "TableView" });

	useEffect(() => {
		if (customerReducer) setState((s) => ({ ...s, ...customerReducer }));
	}, [customerReducer]);

	const handleSubmitReservation = async () => {
		const {
			selectedTable,
			selectedDate,
			selectedHour,
			_id: customerID,
			customerName,
			numberOfGuest,
			phoneNumber,
		} = state;

		for (const tableNumber of selectedTable) {
			try {
				//First add the new reservation to the reservation DB
				const newReservation = {
					tableNumber: tableNumber,
					date: selectedDate,
					hour: selectedHour,
					customerID: customerID || "",
					customerName: customerName,
					numberOfGuest: numberOfGuest,
					phoneNumber: phoneNumber,
				};

				const reservationResult = await axios.post(
					"/api/reservation/",
					newReservation
				);

				const reservationID = reservationResult.data._id;

				//Then add that reservation to the specific table because
				//mongoDB does not allow relationship like relational DB.

				const updateTableData = {
					reservationIDString: reservationID,
					tableNumber: tableNumber,
					date: selectedDate,
					hour: selectedHour,
					requestType: "add",
				};

				const tableUpdateResult = await axios.put(
					"/api/table/",
					updateTableData
				);

				setState({
					...state,
					notify: {
						type: "success",
						msg: [tableUpdateResult.data],
					},
					viewMode: "DoneReservation",
				});

				if (state.isLoggedIn) {
					dispatch({
						type: "action.addBooking",
						payload: {
							_id: reservationID,
							tableNumber,
							date: selectedDate,
							hour: selectedHour,
							numberOfGuest,
						},
					});
				}
			} catch (error) {
				console.log(error);
				setState({
					...state,
					notify: { type: "danger", msg: error.response.data },
				});
			}
		}
	};

	return (
		<ReservationContext.Provider value={[state, setState]}>
			<NotifyPanel type={state.notify?.type}>{state.notify?.msg}</NotifyPanel>
			<TableView />
			<NewReservationForm />
			<FinalizingView onSubmit={handleSubmitReservation} />
			<DoneReservation />
		</ReservationContext.Provider>
	);
};
