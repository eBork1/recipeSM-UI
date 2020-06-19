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
import MyRecipes from './Recipes/MyRecipes';
import CreateRecipe from './Recipes/CreateRecipe';
import UserRecipes from './Recipes/UserRecipes';
import Recipe from './Recipes/Recipe';

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
						<Route exact path="/myrecipes">
							<MyRecipes
								loginStatus={this.state.loggedIn}
							/>
						</Route>
						<Route exact path="/myrecipes/create">
							<CreateRecipe
								loginStatus={this.state.loggedIn}
							/>
						</Route>
						<Route path="/user/:username/recipes" children={<GetUserForRecipes />} >
						</Route>
						<Route exact path="/user/:username" children={<GetUserUrl />}>
						</Route>
						<Route exact path="/recipe/:id" children={<GetSingleRecipe />}>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

function GetUserUrl() {
	let { username } = useParams();
	return (
		<Profile userName={username} />
	);
}

function GetUserForRecipes() {
	let { username } = useParams();
	return (
		<UserRecipes username={username} />
	);
}

function GetSingleRecipe() {
	let { id } = useParams();
	return (
		<Recipe recipe={id} />
	)
}
