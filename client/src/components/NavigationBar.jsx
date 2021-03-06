import React, { useState } from "react";
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
    <div>
      <Navbar color="faded m-3 navbar-expand-lg" light>
        <NavbarBrand href="/" className="mr-auto">
          Salt Pepper
        </NavbarBrand>
        <NavbarToggler onClick={() => toggleNavBar(!isOpen)} className="my-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="justify-content-end" style={{ width: "100%" }}>
            {navLinks[customerReducer?.isLoggedIn ? 1 : 0].map((link, key) => {
              return (
                <NavItem key={key}>
                  <NavLink className="float-end" href={link.href}>
                    {link.name}
                    <span className="d-none d-lg-inline text-secondary fw-light align-self-center ms-2">
                      |
                    </span>
                  </NavLink>
                </NavItem>
              );
            })}
            <hr className="my-1 mx-0" />
            <NavItem>
              <NavLink className="float-end text-dark" href="/reservation">
                Reserve a table
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
