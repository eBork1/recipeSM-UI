import React from 'react';
import axios from 'axios';

export default class MyRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        }
    }

    getRecipes() {
        let username = localStorage.getItem("username")
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/recipes/' + username,
        })
            .then(response => {
                this.setState({ recipes: response.data });
                console.log(this.state.recipes);
            });
    }

    componentDidMount() {
        this.getRecipes();
    }

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
                        <div className="row mt-3">
                            {this.state.recipes.map((recipe, index) => (
                                <div key={index} className="col-sm-12 col-md-8 col-lg-4 mx-auto text-center bg-light mb-3">
                                    <div className="border-bottom">
                                        <h4>{recipe.title}</h4>
                                        <p>Difficulty: {recipe.difficulty}/5</p>
                                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                        <p><strong>Steps</strong> <br />{recipe.body}</p>
                                    </div>
                                </div>
                            )
                            )}
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