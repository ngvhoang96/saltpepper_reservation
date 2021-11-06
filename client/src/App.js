import "./App.css";
import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AccountView from "./components/AccountView";
import HomeView from "./components/HomeView";
import NavigationBar from "./components/NavigationBar";
import SignUpView from "./components/SignUpView";
import { Reservation } from "./components/Reservation";

function App() {
	return (
		<Container className="themed-container">
			<NavigationBar />
			<BrowserRouter>
				<Switch>
					<Route path="/reservation" component={Reservation} />
					<Route path="/account" component={AccountView} />
					<Route path="/register" component={SignUpView} />
					<Route path="/" component={HomeView} />
				</Switch>
			</BrowserRouter>
		</Container>
	);
}

export default App;
