import { useState } from "react";
import {
	Navbar,
	NavLink,
	NavbarBrand,
	NavbarToggler,
	Nav,
	NavItem,
	Collapse,
} from "reactstrap";

export const NavigationBar = () => {
	const [isOpen, toggleNavBar] = useState(false);

	return (
		<Navbar color="faded m-3" light>
			<NavbarBrand href="/" className="mr-auto">
				Salt Pepper
			</NavbarBrand>
			<NavbarToggler onClick={() => toggleNavBar(!isOpen)} className="mr-2" />
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					<NavItem>
						<NavLink href="/account/">Log in</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/register/">Sign up</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/reservation">Reserve a table</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};
