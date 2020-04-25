import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            errorStatus: "",
        }
        this.onChange = this.onChange.bind(this);
        this.register = this.register.bind(this);
    }

    onChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value,
        })
    }

    register(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/register',
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            },
        })
            .then(response => {
                this.setState({
                    content: response.data.token
                });
                const user_token = this.state.content;
                localStorage.setItem("user_token", user_token);
                window.location.replace("/profile");

            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorStatus: "There was an error creating your account. Please check your credentials and try again."
                })
            })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <h1 className="border-bottom mb-4 pb-2">Register</h1>
                            <form onSubmit={this.register}>
                                <div className="form-group text-center">
                                    <label>Username</label>
                                    <input onChange={this.onChange} type="text" name="name" className="form-control" id="inputName" placeholder="example123" />
                                </div>
                                <div className="form-group text-center">
                                    <label>Email address</label>
                                    <input onChange={this.onChange} type="email" name="email" className="form-control" id="inputEmail1" placeholder="example@email.com" />
                                </div>
                                <div className="form-group text-center">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input onChange={this.onChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Min. 8 Characters" />
                                </div>
                                <div className="form-group text-center">
                                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                    <input onChange={this.onChange} type="password" name="password_confirmation" className="form-control" id="inputPasswordConfirmation" placeholder="Confirm" />
                                </div>
                                <button type="submit" className="btn btn-dark btn-block mb-3">Register</button>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <p>{this.state.errorStatus}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p>Already have an account? <a className="text-primary" href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        )
    }
}