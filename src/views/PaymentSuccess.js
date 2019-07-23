import React, {Fragment} from "react";
import {Alert} from 'reactstrap';

const PaymentSuccess = () => {
    return (
        <Fragment>
            <Alert className="text-center" color="success">
                <h4>Success</h4>
                Thank you for your payment!  We look forward to seeing you in October!
            </Alert>
            <hr/>
        </Fragment>
    );
}

export default PaymentSuccess;
