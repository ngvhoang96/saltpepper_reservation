import { Component } from "react";
import axios from "axios";

class ReservationView extends Component {
	state = {
		reservations: [],
	};
	async componentDidMount() {
		const { data: reservations } = await axios.get("/api/reservation");
		this.setState({ reservations });
	}
	render() {
		return (
			<div>
				Reservation View
				<ul>
					{this.state.reservations.map((r) => {
						return (
							<li key={r.reservationID}>
								<span>
									Reservation ID: {r.reservationID}: Table {r.tableNumber} |
									isReserved? {r.isReserved ? "Yes" : "No"}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
export default ReservationView;
