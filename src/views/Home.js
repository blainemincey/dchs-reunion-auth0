import React, {Fragment} from "react";
import {Alert} from 'reactstrap';
import {useAuth0} from "../react-auth0-spa";
import Hero from "../components/Hero";
import HeroAuth from '../components/HeroAuth';

const Home = () => {
    const {isAuthenticated} = useAuth0();
    return (
        <Fragment>
            <Alert className="text-center" color="primary">
                <h4>SAVE THE DATE</h4>
                30-year Class Reunion - Saturday, October 5, 2019
            </Alert>
            {!isAuthenticated && (
                <Hero/>
            )}
            {isAuthenticated && (
                <HeroAuth/>
            )}
            <Alert className="text-center" color="danger">
                <h4>Reunion Registration Deadline - Friday, August 16, 2019</h4>
            </Alert>
            <hr/>
        </Fragment>
    );
}

export default Home;
