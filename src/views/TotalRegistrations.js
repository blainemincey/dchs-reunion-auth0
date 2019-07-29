import React from "react";
import {useAuth0} from "../react-auth0-spa";
import TotalRegistrationView from "./TotalRegistrationView";

const TotalRegistrations = () => {

    const {user} = useAuth0();

    return (
        <div>
            <h4 className="text-center">Total Registrations</h4>
            <hr className="myline"/>
            <TotalRegistrationView user={user}/>
        </div>
    );
}

export default TotalRegistrations;
