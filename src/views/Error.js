import React, {Fragment} from "react";
import {Alert} from 'reactstrap';

const Error = () => {
    return (
        <Fragment>
            <Alert className="text-center" color="error">
                <h4>Error</h4>
                There was a problem with updating your Registration Profile.
            </Alert>
            <p>Please try again.  If this error persists, please use the Questions link in the navigation bar above.</p>
            <hr/>
        </Fragment>
    );
}

export default Error;
