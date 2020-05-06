import React from 'react';

export default class RecipeThumbnail extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <p>Difficulty: {this.props.difficulty}/5</p>
                <p><strong>Ingredients:</strong> {this.props.ingredients}</p>
                <p><strong>Steps</strong> <br />{this.props.body}</p>
            </div>
        )
    }
}