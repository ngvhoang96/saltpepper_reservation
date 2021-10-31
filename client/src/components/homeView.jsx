import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "reactstrap";

class HomeView extends Component {
	render() {
		return (
			<Container className="themed-container">
				<Jumbotron>
					<h1 className="display-3">Hello customers!</h1>
					<p className="lead">
						Welcome to Salt Pepper reservation, we would like to introduce to
						you our new look of the website.
					</p>
					<hr className="my-2" />
					<p>Click now to make a reservation!</p>
					<p className="lead">
						<Link to={"/reservation"}>
							<Button color="danger">Reserve Now</Button>
						</Link>
					</p>
					{/* <p className="lead">Welcome to Salt Pepper Reservation</p>
					<ul>
						<li>
							<Link to={"/reservation"}>Reservations</Link>
						</li>
						<li>
							<Link to={"/account"}>Account Access</Link>
						</li>
					</ul> */}
				</Jumbotron>
			</Container>
		);
	}
}

export default HomeView;
