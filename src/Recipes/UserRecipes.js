import React from 'react';
import RecipeThumbnail from './RecipeThumbnail';
import axios from 'axios';

export default class UserRecipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            recipes: null,
        }
    }

    getRecipes() {
        let username = this.props.username;
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
        let userProfileUrl = "/user/" + this.state.username;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-sm-8 mx-auto text-center">
                        <h2><a href={userProfileUrl} className="text-dark">{this.state.username}'s</a> Recipes</h2>
                    </div>
                </div>
                <div className="text-dark">
                    {this.state.recipes === null ?
                        <div className="text-center">nothing to see here</div>
                        :
                        <div>
                            {this.state.recipes.map((recipe, idx) => {
                                return (
                                    <div key={idx} className="col-sm-12 col-md-10 col-lg-8 mx-auto text-center bg-light mb-3">
                                        <div className="border-bottom">
                                            <RecipeThumbnail
                                                title={recipe.title}
                                                difficulty={recipe.difficulty}
                                                ingredients={recipe.ingredients}
                                                body={recipe.body}
                                                id={recipe.id}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}