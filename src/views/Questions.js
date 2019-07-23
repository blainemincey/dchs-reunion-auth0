import React, {Fragment} from "react";
import Info from "../components/Info";

const Questions = () => {
    return (
        <Fragment>
            <h4 className="text-center">Questions?</h4>
            <hr className="myline"/>
            <Info authenticated="true"/>
        </Fragment>
    );
}

export default Questions;
