import { Component } from "react";
import axios from "axios";
import Calendar from "react-calendar";

import ReservationList from "./ReservationList";

class ReservationView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
		};
		this.updateReservationByDate = this.updateReservationByDate.bind(this);
	}

	async componentDidMount() {
		await this.updateReservationByDate(Date());
	}

	async updateReservationByDate(date) {
		try {
			// console.log(date.toLocaleDateString("en-US").replaceAll("/", "-"));
			const { data: reservations } = await axios.get(
				"/api/reservation/?date=" +
					new Date(date).toLocaleDateString("en-US").replaceAll("/", "-")
			);
			this.setState({ reservations });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const reservations = this.state.reservations;

		return (
			<div>
				<h2 className=" mb-3">Make A Reservation</h2>
				<Calendar
					onChange={(value) => {
						this.updateReservationByDate(value);
					}}
				/>
				<div className="m-5"></div>
				<ReservationList reservation={reservations} />
			</div>
		);
	}
}
export default ReservationView;
