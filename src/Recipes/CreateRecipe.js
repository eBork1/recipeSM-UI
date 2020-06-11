import React from 'react';
import axios from 'axios';

export default class CreateRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        const user_token = localStorage.getItem("user_token");
        // alert('A name was submitted: ' + this.state.value);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/createrecipe',
            headers: {
                Authorization: "Bearer " + user_token
            },
            data: {
                title: this.state.title,
                difficulty: this.state.difficulty,
                ingredients: this.state.ingredients,
                body: this.state.body,
            }
        });
        event.preventDefault();
    }



    render() {
        return (
            <div>
                <div className="container">

                    {this.props.loginStatus === true ?
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row mt-5">
                                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto text-center">
                                        <label>
                                            Title
                                        <br />
                                            <input type="text" name="title" value={this.state.value} onChange={this.handleChange} size="40" />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto text-center">
                                        <label>
                                            Difficulty
                                        <br />
                                            <input type="number" name="difficulty" value={this.state.value} onChange={this.handleChange} min="0" max="5" size="5" />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto text-center">
                                        <label>
                                            Ingredients
                                        <br />
                                            <textarea type="text" name="ingredients" value={this.state.value} onChange={this.handleChange} rows="10" cols="40" />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto text-center">
                                        <label>
                                            Description/Steps
                                        <br />
                                            <textarea type="text" name="body" value={this.state.value} onChange={this.handleChange} rows="10" cols="40" />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto text-center mb-5">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        : // Not Logged In
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>To see your recipes, <a href="login">Login here</a>. Don't have an account? <a href="/register">Register</a></p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}