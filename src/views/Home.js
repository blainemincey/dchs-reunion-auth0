import React, {Fragment} from "react";
import {Alert} from 'reactstrap';
import {useAuth0} from "../react-auth0-spa";
import Hero from "../components/Hero";
import HeroAuth from '../components/HeroAuth';
import logo from "../assets/dchslogo.jpg";

const Home = () => {
    const {isAuthenticated} = useAuth0();
    return (
        <Fragment>
            <img src={logo} alt="DCHS Reunion" style={{width:60,height:60}} className="center"/>
            <h4 className="text-center">DCHS Class of 1989</h4>
            <h4 className="text-center">30-Year Reunion Registration</h4>
            <hr className="myline"/>
            {!isAuthenticated && (
                <Hero/>
            )}
            {isAuthenticated && (
                <HeroAuth/>
            )}
            <Alert className="text-center" color="danger">
                <h4>Registration & Ticket Sales Deadline - <b>August 16, 2019</b></h4>
            </Alert>
        </Fragment>
    );
}

export default Home;
