import React from "react";
import {useAuth0} from "../react-auth0-spa";

const HeroAuth = () => {
    const {user} = useAuth0();

    return (
    <div className="text-center hero my-5">

        <h3 className="mb-4">DCHS Class of 1989 Reunion Registration</h3>
        <p>
            Thank you for logging in, <b>{user.name}</b>!
        </p>
        <p>
            Now that you are logged in, please complete or edit your Reunion Registration by clicking the
            Registration navigation above.  Once we have a headcount, we will contact you regarding
            payment.  Thanks!
        </p>

    </div>
    )

};

export default HeroAuth;