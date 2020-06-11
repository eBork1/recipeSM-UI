import React from 'react';
import './RecipeThumbnail.css';

export default class RecipeThumbnail extends React.Component {
    render() {
        return (
            <div className>
                <h4>{this.props.title}</h4>
                <p>Difficulty: {this.props.difficulty}/5</p>
                <p id="body-text"><strong>Ingredients:</strong><br /> {this.props.ingredients}</p>
                <div id="body-text"><strong>Steps</strong> <br />{this.props.body}</div>
            </div>
        )
    }
}