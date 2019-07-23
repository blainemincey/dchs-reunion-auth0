import React from "react";
import {useAuth0} from "../react-auth0-spa";

const HeroAuth = () => {
    const {user} = useAuth0();

    return (
    <div className="text-center hero my-5">
        <p>
            Thank you for logging in, <b>{user.name}</b>!
        </p>
        <p>
            Now that you are logged in, please complete or edit your Reunion Registration by clicking the
            Registration link in the navigation bar above.
        </p>

    </div>
    )

};

export default HeroAuth;