import React, {Fragment} from "react";
import {Alert} from 'reactstrap';

const Success = () => {
    return (
        <Fragment>
            <Alert className="text-center" color="success">
                <h4>Success</h4>
                Your reunion registration was successfully updated!
            </Alert>
            <p>If you have not yet paid for the ticket for you and your guest, please click the 'Payment' link above.</p>
            <hr/>
        </Fragment>
    );
}

export default Success;
