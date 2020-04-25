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
	useParams,
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
		const username = localStorage.getItem("username");
		if (user_token && username) {
			this.setState({
				loggedIn: true,
			});
		} else {
			axios({
				method: 'get',
				url: 'http://127.0.0.1:8000/api/user',
				headers:
				{
					Authorization: "Bearer " + user_token,
				},
			})
				.then((response) => {
					this.setState({
						loggedIn: true,
					});
					localStorage.setItem("username", response.data.name)
				});
		}
	}

	componentDidMount() {
		if (localStorage.getItem("user_token")) {
			this.verifyUser();
		}
	}

	render() {
		let loggedIn = this.state.loggedIn;
		let username = localStorage.getItem("username");
		return (
			<div className="App">
				<NavBar
					loginStatus={this.state.loggedIn}
					username={username}
				/>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							{loggedIn ? <Home /> : <Login />}
						</Route>
						<Route exact path="/logout">
							<Logout />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route path="/user/:id" children={<GetUserUrl />}>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

function GetUserUrl() {
	let { id } = useParams();
	return (
		<Profile userName={id} />
	);
}
