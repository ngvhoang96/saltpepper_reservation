import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import { TableViewByDate } from "./TableViewByDate";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";

export const TableView = () => {
	const [state, setState] = useContext(ReservationContext);
	const [date, setDate] = useState(new Date());
	const [tables, listTables] = useState([]);

	//formate date from "Nov 6 2021 Wed ..."
	//to "11-6-2021"
	const formatDate = (theDate) => {
		const date = new Date(theDate);
		return date.toLocaleDateString("en-US").replace(/\//g, "-");
	};

	const modalText = `You selected ${state.selectedHour} on ${state.selectedDate} from table ${state.selectedTable}`;

	//fetch table from db
	useEffect(() => {
		const fetchTables = async () => {
			return await axios.get("/api/table/");
		};

		if (tables.length === 0) {
			fetchTables().then((response) => {
				const listOfTables = response.data;
				listTables(listOfTables.slice());
			});
		}
	}, [tables]);

	if (state.viewMode === "TableView") {
		return (
			<div>
				<Calendar onChange={(date) => setDate(date)} value={date} />
				{tables.map((table) => {
					return (
						<TableViewByDate
							key={table.tableNumber}
							table={table}
							date={formatDate(date)}
						/>
					);
				})}

				<Modal
					isOpen={state.showModal}
					toggle={() => setState({ ...state, showModal: false })}
				>
					<ModalHeader>Please confirm</ModalHeader>
					<ModalBody>{modalText}</ModalBody>
					<ModalFooter>
						<Button
							color="secondary"
							onClick={() => setState({ ...state, showModal: false })}
						>
							No
						</Button>
						<Button
							color="danger"
							onClick={() =>
								setState({
									...state,
									showModal: false,
									viewMode: "ReservationForm",
								})
							}
						>
							Yes
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	} else {
		return null;
	}
};
