import React from 'react';
import axios from 'axios';

export default function Logout(){
    const user_token = localStorage.getItem("user_token");
    const auth = {
        headers:
        {
            Authorization: "Bearer " + user_token
        }
    };

    axios.get('http://127.0.0.1:8000/api/logout', auth)

        .catch(function (error) {
            console.log(error);
        });

    localStorage.removeItem("user_token");
    window.location.replace("/");

    return(
        <div className="display-4">
            Logging you out...
        </div>
    );
}