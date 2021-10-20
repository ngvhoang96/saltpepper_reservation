import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ReservationView from "./components/reservationView";
import AccountView from "./components/accountView";
import HomeView from "./components/homeView";

function App() {
	return (
		<div>
			<h1>Salt Pepper Reservation</h1>
			<BrowserRouter>
				<Switch>
					<Route path="/reservation" component={ReservationView} />
					<Route path="/account" component={AccountView} />
					<Route path="/" component={HomeView} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
