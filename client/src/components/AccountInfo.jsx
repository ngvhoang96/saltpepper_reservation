import React, { useContext, useState } from "react";

import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { AccountContext } from "../contextProvider/AccountContext";
import AccountProfile from "./AccountProfile";
import AccountPayment from "./AccountPayment";
import AccountBooking from "./AccountBooking";

export const AccountInfo = ({ onLoggedOut }) => {
	const [state] = useContext(AccountContext);
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{ text: "Info" },
		{ text: "Booking", count: state.reservation?.length },
		{ text: "Payment", count: state.payments?.length },
	];

	return (
		<div>
			<h3>Hi {state?.customerName || "member"}, </h3>
			<span className="d-block text-secondary">
				Preferred Diner ID: {String(state?._id).slice(-6) || 0}
			</span>
			<span className="d-block mb-3">Points: {state?.points || 0}</span>
			<Button className="mb-3" onClick={onLoggedOut}>
				Log out
			</Button>
			<Nav tabs className="mb-3">
				{tabs.map((tab, key) => {
					return (
						<NavItem key={key}>
							<NavLink
								style={{ cursor: "pointer" }}
								className="text-secondary"
								active={key === activeTab}
								onClick={() => setActiveTab(key)}
							>
								{tab.text}
								<span className="ms-1 align-top badge alert-success">
									{tab.count || undefined}
								</span>
							</NavLink>
						</NavItem>
					);
				})}
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId={0}>
					<AccountProfile />
				</TabPane>
				<TabPane tabId={1}>
					<AccountBooking />
				</TabPane>
				<TabPane tabId={2}>
					<AccountPayment />
				</TabPane>
			</TabContent>
		</div>
	);
};
