import { Component } from "react";
import { Link } from "react-router-dom";
class HomeView extends Component {
	render() {
		return (
			<div>
				Welcome to Salt Pepper Reservation
				<ul>
					<li>
						<Link to={"/reservation"}>Reservations</Link>
					</li>
					<li>
						<Link to={"/account"}>Account Access</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default HomeView;
