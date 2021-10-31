import { Component } from "react";
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
	Alert,
	Button,
} from "reactstrap";
import axios from "axios";

class ReservationView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDate: "2021-10-30",
			date: ["2021-10-29", "2021-10-30", "2021-10-31", "2021-11-01"],
			reservations: [],
		};
		this.handlePreviousDateClick = this.handlePreviousDateClick.bind(this);
		this.handleNextDateClick = this.handleNextDateClick.bind(this);
		this.handleDateClick = this.handleDateClick.bind(this);
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

	handlePreviousDateClick(e) {
		let activeDate = this.state.activeDate;
		const date = this.state.date;
		let currentIndex = date.indexOf(activeDate);
		currentIndex--;
		activeDate = date.at(currentIndex);
		this.setState({ activeDate });
		this.updateReservationByDate(activeDate);
	}

	handleNextDateClick() {
		let activeDate = this.state.activeDate;
		const date = this.state.date;
		let currentIndex = date.indexOf(activeDate);
		currentIndex++;
		activeDate = date.at(currentIndex);
		this.setState({ activeDate });
		this.updateReservationByDate(activeDate);
	}

	handleDateClick(newDate) {
		this.setState({ activeDate: newDate });
	}

	render() {
		let dates = this.state.date;
		let activeDate = this.state.activeDate;
		const reservations = this.state.reservations;
		const date = new Date();
		return (
			<Container className="themed-container">
				<h1 className="display-3 mb-3">Reservation View</h1>

				<Pagination aria-label="Page navigation example">
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={this.handlePreviousDateClick}
							color="danger"
						>
							{"<"}
						</PaginationLink>
					</PaginationItem>
					{dates.map((date) => {
						return (
							<PaginationItem key={date} active={activeDate === date}>
								<PaginationLink href="#">
									{date.substr(date.lastIndexOf("-") + 1)}
								</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationLink href="#" onClick={this.handleNextDateClick}>
							{">"}
						</PaginationLink>
					</PaginationItem>
				</Pagination>
				{reservations.map((r) => {
					return (
						<Alert key={r._id} color="secondary">
							Table {r.tableNumber}{" "}
							<Button
								color={r.isReserved ? "secondary" : "primary"}
								disabled={r.isReserved}
							>
								{r.hour}
							</Button>
						</Alert>
					);
				})}
			</Container>
		);
	}
}
export default ReservationView;
