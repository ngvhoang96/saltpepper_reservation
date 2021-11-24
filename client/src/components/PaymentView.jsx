import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Label, FormGroup, InputGroup } from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";
import { addPaymentToCustomerReducer } from "../redux_store/reducers/customerReducer";

export default function PaymentView() {
	const [state, setState] = useContext(ReservationContext);
	const dispatch = useDispatch();

	const handleChangePaymentMethod = (event) => {
		const newMethod = event.target.value;
		setState({ ...state, preferredPaymentMethod: newMethod });
		dispatch({
			type: "action.updatePaymentMethod",
			payload: newMethod,
		});
	};

	if (!state?.isHoliday || state?.paid) {
		return null;
	} else {
		return (
			<div>
				<div className="mb-3">
					<p className="d-block my-3 fst-italic">
						{
							<PaymentReminder
								date={state.selectedDate}
								isHoliday={state.isHoliday}
							/>
						}
					</p>
				</div>
				<PreferredPayment
					selected={state.preferredPaymentMethod}
					onChangeMethod={handleChangePaymentMethod}
				/>
				{state.preferredPaymentMethod === undefined ||
				state.preferredPaymentMethod === "Credit" ? (
					<PaymentForm />
				) : (
					<>
						<div className="fw-bolder mb-3">{nonCreditMessage}</div>
						<Button
							onClick={() => {
								setState({
									...state,
									paid: true,
									notify: {
										type: "warning",
										msg: [paymentNonCreditSuccess],
									},
								});
							}}
						>
							Got it!
						</Button>
					</>
				)}
			</div>
		);
	}
}

const PaymentForm = () => {
	const [state, setState] = useContext(ReservationContext);
	const dispatch = useDispatch();

	const handlePayment = (e) => {
		e.preventDefault();
		if (state.preferredPaymentMethod === "Credit") {
			const newPayment = {
				customerID: state._id,
				amount: 10,
				date: new Date().toLocaleDateString("en-US").replace(/\//g, "-"),
				description:
					"Booked Table " + state.selectedTable + " for " + state.selectedDate,
			};

			dispatch(addPaymentToCustomerReducer(newPayment));

			setState({
				...state,
				paid: true,
				notify: { type: "success", msg: [paymentCreditSuccess] },
			});
		}
	};

	return (
		<Form onSubmit={handlePayment}>
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
						<div className="form-group mb-3">
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
			<Button color="danger">Proceed</Button>
		</Form>
	);
};

const PreferredPayment = ({ selected, onChangeMethod }) => {
	const methods = ["Credit", "Cash", "Check"];

	return (
		<FormGroup className="mb-3">
			<Label className="me-2">Payment method: </Label>
			{methods.map((method, key) => {
				return (
					<Label className="me-2" key={key}>
						<Input
							type="radio"
							value={method}
							checked={method === selected}
							onChange={onChangeMethod}
						/>
						{method}
					</Label>
				);
			})}
		</FormGroup>
	);
};

const nonCreditMessage =
	"Non-credit payment needs to be done in person at least one day before the reservation day!!";

const paymentCreditSuccess = "Thank you for your payment";

const paymentNonCreditSuccess =
	"Please remember to pay at the restaurant at least one day ahead to secure your reservation";

const PaymentReminder = ({ date, isHoliday }) => {
	return (
		<span>
			For the restaurant convenience, we need to reserve a $10 fee for this
			booking (as {date} is
			{isHoliday ? " a " : " not a "} holiday/weekend). Do not worry, you will
			earn points from paying for this booking!
		</span>
	);
};
