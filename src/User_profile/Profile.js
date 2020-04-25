import React from 'react';
import axios from 'axios';
import './profile.css'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            editMode: false,
            bio: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
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
                this.setState({ userData: response.data })
                this.checkOwnership();
            });
    }

    checkOwnership() {
        let owner = localStorage.getItem('username') === this.state.userName;
        if (owner) {
            this.setState({ owner: true });
        }
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({
            bio: value,
        })
    }

    submitBio(event) {
        event.preventDefault();
        const user_token = localStorage.getItem("user_token");
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/updatebio',
            headers: {
                Authorization: "Bearer " + user_token
            },
            params: {
                bio: this.state.bio,
            },
        })
            .then(() => {
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    toggleEdit() {
        if (this.state.editMode === false) {
            this.setState({ editMode: true });
        } else {
            this.setState({ editMode: false });
        }
    }

    componentDidMount() {
        this.checkUsernameIsReal();
    }

    render() {
        var firstTime = document.referrer === "http://localhost:3000/register";
        return (
            <div>
                {this.state.userData ?
                    <div className="container text-center">
                        {firstTime ? "Welcome! Finish setting up your profile" : null}
                        < h2 className="text-center mt-5">Profile</h2>
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-sm-12 mx-auto text-center">
                                <img
                                    src="https://i.ya-webdesign.com/images/default-image-png-1.png"
                                    alt="profilepic"
                                    id="profilepic">
                                </img>
                                <h6 className="m-3">{this.state.userName}</h6>
                                <div className="btn btn-primary mb-3">Follow</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-sm-12 mx-auto text-center">
                                <h6>bio</h6>
                                {this.state.owner === true ?
                                    <button className="btn btn-link pt-0" onClick={() => { this.toggleEdit() }}>edit</button>
                                    :
                                    null
                                }
                                {this.state.editMode === true ?
                                    <form onSubmit={this.submitBio}>
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            name="bio"
                                            defaultValue={this.state.userData.bio}
                                            onChange={this.handleChange}
                                        >
                                            {/* {this.state.userData.bio} */}
                                        </textarea>
                                        <button type="submit">Done</button>
                                    </form>
                                    :
                                    <p className="bg-light text-left text-center">
                                        {this.state.userData.bio}
                                    </p>
                                }
                            </div>
                        </div>
                    </div >
                    :
                    <div> user does not exist</div>
                }
            </div>
        )
    }
}
