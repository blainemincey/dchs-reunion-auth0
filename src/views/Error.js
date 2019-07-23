import React, {Fragment} from "react";
import {Alert} from 'reactstrap';

const Error = () => {
    return (
        <Fragment>
            <Alert className="text-center" color="error">
                <h4>Error</h4>
                Yikes!  We are experiencing a problem!
            </Alert>
            <p>Please try again.  If this error persists, please use the email address indicated in the footer below.</p>
            <hr/>
        </Fragment>
    );
}

export default Error;
