import React from 'react';
import './RecipeThumbnail.css';

export default class RecipeThumbnail extends React.Component {
    render() {
        let recipeLink = "http://localhost:3000/recipe/" + this.props.id;
        return (
            <div className>
                <h4>{this.props.title}</h4>
                <p>Difficulty: {this.props.difficulty}/5</p>
                <p id="body-text"><strong>Ingredients:</strong><br /> {this.props.ingredients}</p>
                <div id="body-text"><strong>Steps</strong> <br />{this.props.body}</div>
                <a href={recipeLink} className="btn btn-danger">Full Recipe</a>
            </div>
        )
    }
}