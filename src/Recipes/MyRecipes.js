import React from 'react';

export default class MyRecipes extends React.Component {


    render() {
        return (
            <div className="container">
                {/* Logged In */}
                {this.props.loginStatus === true ?
                    <div>
                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <h2>My Recipes</h2>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-8 col-lg-4 mx-auto text-center">
                                <a className="btn btn-block btn-danger" href="/myrecipes/create">Create New Recipe</a>
                            </div>
                        </div>
                    </div>
                    : // Not Logged In
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>To see your recipes, <a href="login">Login here</a>. Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}