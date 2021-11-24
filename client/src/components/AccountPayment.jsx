import React, { useContext } from "react";
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	CardHeader,
} from "reactstrap";
import { AccountContext } from "../contextProvider/AccountContext";

function AccountPayment() {
	const [state] = useContext(AccountContext);

	return (
		<div>
			{state.payments?.map((payments, key) => {
				return (
					<Card key={key} className="mb-3">
						<CardHeader>
							<div className="row">
								<div className="col">
									<CardTitle tag="h5">{payments.description}</CardTitle>
								</div>
								<div className="col">
									<CardSubtitle className="mb-2 text-muted float-end">
										Payment# {String(payments._id).slice(-6)}
									</CardSubtitle>
								</div>
							</div>
						</CardHeader>
						<CardBody>
							<CardTitle>Total: ${payments.amount}</CardTitle>
							<CardText className="text-secondary">
								Payment placed on {payments.date}
							</CardText>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
}

export default AccountPayment;
