import { Component } from "react";
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap";

class ReservationView extends Component {
	constructor(props) {
		super(props);
		this.state = { activeDate: 30, date: [29, 30, 31, 1] };
		this.handlePreviousDateClick = this.handlePreviousDateClick.bind(this);
	}
	// state = {
	// 	reservations: [],
	// };
	// async componentDidMount() {
	// 	try {
	// 		const { data: reservations } = await axios.get("/api/reservation");
	// 		this.setState({ reservations });
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	handlePreviousDateClick() {}
	render() {
		return (
			<Container className="themed-container">
				Reservation View
				{/* {this.state.reservations.map((r) => {
					return (
						<Alert key={r._id} color="secondary">
							Table {r.tableNumber} is
							{r.isReserved ? " reserved" : " available"}
							<Button color="success">Select</Button>
						</Alert>
					);
				})} */}
				<Pagination aria-label="Page navigation example">
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem>
					{this.state.date.map((date) => {
						return (
							<PaginationItem
								key={date}
								active={this.state.activeDate === date}
							>
								<PaginationLink href="#">{date}</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationLink next href="#" />
					</PaginationItem>
				</Pagination>
			</Container>
		);
	}
}
export default ReservationView;
