import React, { Component } from "react";
import {
	Navbar,
	NavLink,
	NavbarBrand,
	NavbarToggler,
	Nav,
	NavItem,
	Collapse,
} from "reactstrap";

class NavigationBar extends Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
		return (
			<Navbar color="faded m-3" light>
				<NavbarBrand href="/" className="mr-auto">
					Salt Pepper
				</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
				<Collapse isOpen={!this.state.collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<NavLink href="/account/">Log In</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/register/">Sign Up</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/reservation">Reservations</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
export default NavigationBar;
