import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { TableViewByDate } from "./TableViewByDate";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";

export const TableView = (props) => {
	const [date, setDate] = useState(new Date());
	const [selectedHour, setSelectedHour] = useState("");
	const [selectedTable, setSelectedTable] = useState(0);
	const [tables, listTables] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState("");

	const formatDate = (theDate) => {
		const date = new Date(theDate);
		return date.toLocaleDateString("en-US").replace(/\//g, "-");
	};

	const handleDateChange = (date) => {
		setDate(date);
	};

	const handleSelectHour = (hour, table) => {
		setSelectedHour(hour);
		setSelectedTable(table);
		setModalText(
			`You selected ${hour} on ${formatDate(date)} from table ${table}`
		);
		setShowModal(true);
	};

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

	return (
		<div>
			<Calendar onChange={(date) => handleDateChange(date)} value={date} />
			{tables.map((table) => {
				return (
					<TableViewByDate
						key={table.tableNumber}
						table={table}
						date={formatDate(date)}
						onSelectHour={handleSelectHour}
					/>
				);
			})}

			<Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
				<ModalHeader>Confirm</ModalHeader>
				<ModalBody>{modalText}</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={() => setShowModal(false)}>
						No
					</Button>
					<Button
						color="danger"
						onClick={() =>
							props.onConfirmedHour(
								formatDate(date),
								selectedHour,
								selectedTable
							)
						}
					>
						Yes
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};
