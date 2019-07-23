import React from "react";
import {useAuth0} from "../react-auth0-spa";
import PayPalForm from "./PayPalForm";

const Payment = () => {

    const {user} = useAuth0();

    return (
        <div>
            <h4 className="text-center">Payment</h4>
            <hr className="myline"/>
            <PayPalForm user={user}/>
        </div>
    );
}

export default Payment;
