import { Component } from "react";
import axios from "axios";

class ReservationView extends Component {
	state = {
		reservations: [],
	};
	async componentDidMount() {
		try {
			const { data: reservations } = await axios.get("/api/reservation");
			this.setState({ reservations });
		} catch (error) {
			console.error(error);
		}
	}
	render() {
		return (
			<div>
				Reservation View
				<ul>
					{this.state.reservations.map((r) => {
						return (
							<li key={r._id}>
								<span>
									Table {r.tableNumber} is
									{r.isReserved ? " reserved" : " available"}
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
