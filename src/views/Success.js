import React, {Fragment} from "react";
import {Alert} from 'reactstrap';

const Success = () => {
    return (
        <Fragment>
            <Alert className="text-center" color="success">
                <h4>Success</h4>
                Your reunion registration was successfully updated!
            </Alert>
            <p>Thank you for registering!</p>
            <p>Watch your inbox for additional information.  We look forward to seeing you soon!</p>
            <hr/>
        </Fragment>
    );
}

export default Success;
