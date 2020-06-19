import React from 'react';
import axios from 'axios';
import './Recipe.css';

export default class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
        }
    }

    getRecipe(recipeID) {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/recipe/" + recipeID,
        }).then(response => {
            this.setState({ recipe: response.data });
            console.log(this.state.recipe[0]);
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getRecipe(this.props.recipe);
    }

    render() {
        let recipe = this.state.recipe;
        return (
            <div>
                {recipe.map((recipe, idx) => {
                    return (
                        <div key={idx}>
                            <p>{recipe.title}</p>
                            <p>{recipe.difficulty}/5</p>
                            <p className="body-text">{recipe.body}</p>
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}