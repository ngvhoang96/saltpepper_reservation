import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Label, FormGroup, InputGroup } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { addPaymentToCustomerReducer } from "../redux_store/reducers/customerReducer";

function convertDate(date_str) {
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let temp_date = date_str.split("-");
	return months[temp_date[0] - 1] + " " + temp_date[1] + ", " + temp_date[2];
}

export default function PaymentForm() {
	const [state, setState] = useContext(ReservationContext);
	const dispatch = useDispatch();

	const handlePay = (e) => {
		e.preventDefault();
		const newPayment = {
			customerID: state._id,
			amount: 10,
			date: new Date().toLocaleDateString("en-US").replace(/\//g, "-"),
			description:
				"Booked Table " +
				state.selectedTable +
				" for " +
				convertDate(state.selectedDate),
		};

		dispatch(addPaymentToCustomerReducer(newPayment));

		setState({
			...state,
			paid: true,
			notify: { type: "success", msg: ["Thank you for your payment"] },
		});
	};

	if (!state?.isHoliday || state?.paid) {
		return null;
	} else {
		return (
			<div>
				<div className="mb-3">
					<p className="d-block my-3 fst-italic">
						For the restaurant convenience, we need to reserve a $10 fee for
						this booking (as {state.selectedDate} is
						{state.isHoliday ? " a " : " not a "} holiday/weekend). Do not
						worry, you will earn points from paying for this booking!
					</p>
				</div>
				<Form onSubmit={handlePay}>
					<FormGroup className="mb-3">
						<Label for="nameOnCard">
							<h6>Name On Card</h6>
						</Label>
						<Input
							id="nameOnCard"
							onChange={(event) =>
								setState({ ...state, customerName: event.target.value })
							}
							value={state?.customerName || ""}
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<Label for="cardNumber">
							<h6>Card Number</h6>
						</Label>
						<InputGroup>
							<Input
								type="number"
								id="cardNumber"
								onChange={(event) =>
									setState({ ...state, cardNumber: event.target.value })
								}
								value={state?.cardNumber || ""}
								required
							/>
						</InputGroup>
						<div className="row mt-3">
							<div className="col-sm-8">
								<FormGroup>
									<Label>
										<h6>Expiration Date</h6>
									</Label>
									<InputGroup>
										<Input
											type="number"
											placeholder="MM"
											className="form-control"
											required
										/>
										<Input
											type="number"
											placeholder="YY"
											className="form-control"
											required
										/>
									</InputGroup>
								</FormGroup>
							</div>

							<div className="col-sm-4">
								<div className="form-group mb-4">
									<FormGroup>
										<Label>
											<h6>CVV</h6>
										</Label>
										<Input type="text" required className="form-control" />
									</FormGroup>
								</div>
							</div>
						</div>
					</FormGroup>
					<Button color="danger">Pay</Button>
				</Form>
			</div>
		);
	}
}
