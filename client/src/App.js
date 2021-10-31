import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ReservationView from "./components/reservationView";
import AccountView from "./components/accountView";
import HomeView from "./components/homeView";
import NavigationBar from "./components/navigationBar";
import RegisterView from "./components/registerView";

function App() {
	return (
		<div>
			<NavigationBar />
			<BrowserRouter>
				<Switch>
					<Route path="/reservation" component={ReservationView} />
					<Route path="/account" component={AccountView} />
					<Route path="/register" component={RegisterView} />
					<Route path="/" component={HomeView} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
