import React from 'react';

export default class NavBar extends React.Component {
    render() {
        let userpage = "/user/" + localStorage.getItem('username');
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <a className="navbar-brand" href="/">Sauce'd</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/feed">Feed</a>
                        <a className="nav-item nav-link" href="/communities">Communities</a>
                        {/* <a className="nav-item nav-link" href="/profile">Profile</a> */}
                    </div>
                    <div className="nav navbar-nav ml-auto">
                        <h5 className="mt-2 mr-4">
                            <a className="nav-item text-white" href={userpage}>
                                {this.props.username}
                            </a>
                        </h5>
                        {this.props.loginStatus === true ?
                            <a className="nav-item text-dark mt-2" href="/logout">Logout</a>
                            :
                            <a className="nav-item nav-link" href="/login">Login</a>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}