import React, { useContext, useState } from "react";

import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { AccountContext } from "../contextProvider/AccountContext";
import AccountProfile from "./AccountProfile";
import AccountPayment from "./AccountPayment";

export const AccountInfo = ({ onLoggedOut }) => {
	const [state, setState] = useContext(AccountContext);
	const [activeTab, setActiveTab] = useState(0);

	const tabs = ["Info", "Payment"];

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
								className="text-secondary"
								active={key === activeTab}
								onClick={() => setActiveTab(key)}
							>
								{tab}
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
					<AccountPayment />
				</TabPane>
			</TabContent>
		</div>
	);
};
