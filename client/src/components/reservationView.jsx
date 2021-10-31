import { Component } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import Calendar from "react-calendar";

import ReservationList from "./ReservationList";

class ReservationView extends Component {
	constructor(props) {
		super(props);
		const date = new Date();
		this.state = {
			activeDate: date
				.toLocaleDateString("ko-KR")
				.replaceAll(".", "")
				.replaceAll(" ", "-"),
			date: ["2021-10-29", "2021-10-30", "2021-10-31", "2021-11-01"],
			reservations: [],
		};
		this.updateReservationByDate = this.updateReservationByDate.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	async componentDidMount() {
		await this.updateReservationByDate(this.state.activeDate);
	}

	async updateReservationByDate(date) {
		try {
			const { data: reservations } = await axios.get(
				"/api/reservation/?date=" + date
			);
			this.setState({ reservations });
		} catch (error) {
			console.error(error);
		}
	}

	handleDateChange(date) {
		this.updateReservationByDate(this.formatDate(date));
	}

	formatDate(date) {
		return date
			.toLocaleDateString("ko-KR")
			.replaceAll(".", "")
			.replaceAll(" ", "-");
	}

	render() {
		const reservations = this.state.reservations;

		return (
			<Container className="themed-container">
				<h1 className="display-3 mb-3">Reservation View</h1>
				<Calendar
					onChange={(value) => {
						this.handleDateChange(value);
					}}
				/>
				<div className="m-5"></div>
				<ReservationList reservation={reservations} />
			</Container>
		);
	}
}
export default ReservationView;
