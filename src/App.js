import React from 'react';

// Packages
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'popper.js';
import 'jquery';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

// Components
import NavBar from './Nav';
import Home from './Home';
import Login from './UserAuth/Login';
import Logout from './UserAuth/Logout';
import Register from './UserAuth/Register';
import Profile from './User_profile/Profile';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedIn: null,
		}
	}

	verifyUser() {
		const user_token = localStorage.getItem("user_token");
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/user',
			headers:
			{
				Authorization: "Bearer " + user_token,
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({
					loggedIn: true
				})
			});
	}

	componentDidMount() {
		if (localStorage.getItem("user_token")){
			this.verifyUser();
			console.log("user token found. Verifying...");
		}
	}

	render() {
		return (
			<div className="App">
				<NavBar
					loginStatus={this.state.loggedIn}
				/>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/logout">
							<Logout />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

