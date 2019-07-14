import React from "react";
import {useAuth0} from "../react-auth0-spa";
import RegistrationForm from './RegistrationForm';

const Registration = () => {

    const {user} = useAuth0();

    return (
        <div>
            <RegistrationForm user={user}/>
        </div>
    );
}

export default Registration;
