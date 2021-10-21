import { Component } from "react";
import { Link } from "react-router-dom";
import {
	Alert,
	Button,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	Container,
	Jumbotron,
} from "reactstrap";
class HomeView extends Component {
	render() {
		return (
			<Container className="themed-container">
				<Jumbotron>
					<p className="lead">Welcome to Salt Pepper Reservation</p>
					<ul>
						<li>
							<Link to={"/reservation"}>Reservations</Link>
						</li>
						<li>
							<Link to={"/account"}>Account Access</Link>
						</li>
					</ul>
				</Jumbotron>
			</Container>
		);
	}
}

export default HomeView;
