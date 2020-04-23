import React from 'react';
import axios from 'axios';
import './profile.css'

function Layout() {

}

function editBio() {

}

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
        }
    }

    checkUsernameIsReal() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/verifyuser',
            params: {
                name: this.props.userName,
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ userID: response.data })
            });
    }

    getUserData() {
        
    }

    componentDidMount() {
        this.checkUsernameIsReal();
    }

    render() {
        var firstTime = document.referrer === "http://localhost:3000/register";
        return (
            <div>
                {this.state.userID ?
                    <div className="container text-center">
                        {firstTime ? "Welcome! Finish setting up your profile" : null}
                        <h2 className="text-center mt-5">Profile</h2>
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-sm-12 mx-auto text-center">
                                <img src="https://i.ya-webdesign.com/images/default-image-png-1.png" alt="profilepic" id="profilepic"></img>
                                <h6 className="m-3">{this.state.userName}</h6>
                                <div className="btn btn-primary mb-3">Follow</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-sm-12 mx-auto text-center">
                                <h6>bio</h6>
                                <p className="bg-light text-left">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                             </p>
                            </div>
                        </div>
                    </div>
                    :
                    <div> user does not exist</div>
                }
            </div>
        )
    }
}
