import React from 'react';

export default class Profile extends React.Component {

    render(){
        var firstTime = document.referrer === "http://localhost:3000/register";

        return(
            <div>
                {firstTime ? "Welcome! Finish setting up your profile" : null}
                <h2 className="text-center">Profile</h2>
            </div>
        )
    }
}