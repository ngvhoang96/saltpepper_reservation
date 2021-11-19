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
import { useSelector } from "react-redux";

export const NavigationBar = () => {
	const [isOpen, toggleNavBar] = useState(false);

	const customerReducer = useSelector((state) => state.customerReducer);

	const navLinks = [
		[
			{ name: "Log in", href: "/account" },
			{ name: "Sign up", href: "/register" },
		],
		[{ name: "My profile", href: "/account" }],
	];

	return (
		<Navbar color="faded m-3 navbar-expand-lg" light>
			<NavbarBrand href="/" className="mr-auto">
				Salt Pepper
				{/* <span className="border border-dark rounded rounded-3 py-1 bg-dark bg-gradient">
					<span className="bg-white rounded-start p-1">Salt</span>{" "}
					<span className="text-white fw-light rounded-end p-1">Pepper</span>
				</span> */}
			</NavbarBrand>
			<NavbarToggler onClick={() => toggleNavBar(!isOpen)} className="my-2" />
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					{navLinks[customerReducer?.isLoggedIn ? 1 : 0].map(
						({ name, href }, key) => {
							return (
								<>
									<NavItem key={key}>
										<NavLink className="float-end" href={href}>
											{" "}
											{name}
										</NavLink>
									</NavItem>
									<span className="d-none d-lg-inline text-secondary fw-light align-self-center mx-2">
										|
									</span>
								</>
							);
						}
					)}
					<hr className="my-1 mx-0" />
					<NavItem>
						<NavLink className="float-end text-dark" href="/reservation">
							Reserve a table
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};
