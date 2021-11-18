import { useState } from "react";
import {
  Navbar,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse,
  Button,
} from "reactstrap";
import { Login } from "./Utility/Login";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const NavigationBar = () => {
  const [isOpen, toggleNavBar] = useState(false);
  const dispatch = useDispatch();
  const customerReducer = useSelector((state) => state.customerReducer);
  const handleLoggedout = (event) => {
    event.preventDefault();
    localStorage.removeItem("_token");
    //redux
    dispatch({ type: "action.logout" });
  };

  if (customerReducer?.isLoggedIn) {
    return (
      <Navbar color="faded m-3" light>
        <NavbarBrand href="/" className="mr-auto">
          Salt Pepper
        </NavbarBrand>
        <NavbarToggler onClick={() => toggleNavBar(!isOpen)} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/account/">My Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/reservation">Reserve a table</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" onClick={handleLoggedout}>
                Log Out
              </NavLink>
            </NavItem>
            {/* <Button className="mt-3" onClick={handleLoggedout}>
              Log out
            </Button> */}
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar color="faded m-3" light>
        <NavbarBrand href="/" className="mr-auto">
          Salt Pepper
        </NavbarBrand>
        <NavbarToggler onClick={() => toggleNavBar(!isOpen)} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <BrowserRouter>
                <Login />
              </BrowserRouter>
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
  }
};
