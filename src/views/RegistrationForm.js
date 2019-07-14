import React, {Fragment, Component} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row, FormFeedback, Alert} from "reactstrap";
import {withRouter} from 'react-router-dom';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            registrationData: '',
            mobileNumberError: false,
            venueError: false,
            costError: false
        }

        this.mdbStitchGETWebhook = process.env.REACT_APP_MONGODB_STITCH_GET_WEBHOOK;
        this.mdbStitchPOSTWebhook = process.env.REACT_APP_MONGODB_STITCH_POST_WEBHOOK;

        this.submitForm = this.submitForm.bind(this);
        this.loadExistingRegistrationData = this.loadExistingRegistrationData.bind(this);
    }

    async loadExistingRegistrationData() {
        console.log("Loading existing data.");
        let url = this.mdbStitchGETWebhook + '?email=' + this.state.user.email;
        console.log('webhook url: ' + url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if (response.ok) {
                console.log('Get reg data response ok!');
                let json = await response.json();
                this.setState({
                    registrationData: json
                });

                return true;
            } else {
                console.log("Response Error!");
                console.log("Unable to load data for email: " + this.state.userinfo.email);

                return false;
            }
            ;
        } catch (e) {
            console.log('Error on post registration', e);
            return false;
        }
    }

    async postRegistration(registrationData) {
        console.log("New Registration: " + JSON.stringify(registrationData));

        try {
            let response = await fetch(this.mdbStitchPOSTWebhook, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                console.log("Response ok!");
                let json = await response.json();
                console.log(json);
                console.log("Successful registration!");
                const {history} = this.props;
                history.push('/success');

                return true;
            } else {
                console.log("Response Error!");
                console.log("Error with saving registration.");
                console.log("Email: " + this.state.user.email);

                const {history} = this.props;
                history.push('/error');
                return false;
            }
            ;
        } catch (e) {
            console.log('Error on post registration', e);
            return false;
        }

    }

    async componentDidMount() {
        await this.loadExistingRegistrationData();
    }

    async submitForm(e) {
        e.preventDefault();

        let mobileNumberError = false;
        let venueError = false;
        let costError = false;
        this.setState({
            mobileNumberError: mobileNumberError,
            venueError: venueError,
            costError: costError
        });

        let mobileNumber = e.target.mobileNumber.value;
        if (mobileNumber) {
            var phoneno = /^\d{10}$/;
            if (mobileNumber.match(phoneno)) {
                console.log("Proper phone number.");
            } else {
                console.log("Bad Mobile Number.");
                this.setState({
                    mobileNumberError: true
                });

                return;
            }
        }

        let venue = e.target.venue.value;
        if (venue.length < 1) {
            console.log("No venue!");
            this.setState({
                venueError: true
            });
            return;
        }

        let cost = e.target.cost.value;
        if (cost.length < 1) {
            console.log("No cost!");
            this.setState({
                costError: true
            });
            return;
        }

        const {user} = this.state;

        // Build out the JSON to submit
        let registrationData = {
            email: user.email,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            preferredName: e.target.preferredName.value,
            maidenName: e.target.maidenName.value,
            mobileNumber: e.target.mobileNumber.value,
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.state.value,
            postalCode: e.target.postalCode.value,
            country: e.target.country.value,
            guestName: e.target.guestName.value,
            venue: e.target.venue.value,
            cost: e.target.cost.value
        };

        this.postRegistration(registrationData);
    }


    render() {

        const {user, registrationData, mobileNumberError, venueError, costError} = this.state;

        let dvilleChecked;
        if (registrationData.venue === 'Douglasville') {
            dvilleChecked = true;
        }

        let atlChecked;
        if (registrationData.venue === 'Atlanta') {
            atlChecked = true;
        }

        let anyChecked;
        if (registrationData.venue === 'Anywhere') {
            anyChecked = true;
        }

        let costYesChecked;
        if (registrationData.cost === 'Yes') {
            costYesChecked = true;
        }

        let costNoChecked;
        if (registrationData.cost === 'No') {
            costNoChecked = true;
        }

        let mobileNumberErrorDiv = '';
        let invalidMobile = false;
        if (mobileNumberError) {
            mobileNumberErrorDiv =
                <FormFeedback>Please enter 10 numbers only for mobile number. No formatting.</FormFeedback>;
            invalidMobile = true;
        }

        let venueErrorDiv = '';
        if (venueError) {
            venueErrorDiv =
                <Alert color="danger">
                    Please choose a venue!!
                </Alert>;
        }

        let costErrorDiv = '';
        if (costError) {
            costErrorDiv =
                <Alert color="danger">
                    Please answer Yes or No!
                </Alert>;
        }

        return (
            <Fragment>
                <h6>Registration Profile: {user.email}</h6>
                <Container>
                    <div className='fa-border'>
                        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="firstName">First Name</Label>
                                        <Input required type="text" name="firstName" className="fa fa-input"
                                               defaultValue={registrationData.firstName}/>
                                    </Col>
                                    <Col>
                                        <Label for="lastName">Last Name</Label>
                                        <Input required type="text" name="lastName"
                                               defaultValue={registrationData.lastName}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="preferredName">Preferred Name</Label>
                                        <Input required type="text" name="preferredName"
                                               defaultValue={registrationData.preferredName}/>
                                    </Col>
                                    <Col>
                                        <Label for="maidenName">Maiden Name</Label>
                                        <Input type="text" name="maidenName"
                                               defaultValue={registrationData.maidenName}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col className='col-md-5'>
                                        <Label for="mobileNumber">Mobile Number</Label>
                                        <Input required type="phone" name="mobileNumber" invalid={invalidMobile}
                                               defaultValue={registrationData.mobileNumber}/>
                                        {mobileNumberErrorDiv}
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="address">Address</Label>
                                        <Input required type="address" name="address"
                                               defaultValue={registrationData.address}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="city">City</Label>
                                        <Input required type="city" name="city"
                                               defaultValue={registrationData.city}/>
                                    </Col>
                                    <Col>
                                        <Label for="state">State</Label>
                                        <Input required type="state" name="state"
                                               defaultValue={registrationData.state}/>
                                    </Col>
                                    <Col>
                                        <Label for="postalCode">Postal Code</Label>
                                        <Input required type="postalCode" name="postalCode"
                                               defaultValue={registrationData.postalCode}/>
                                    </Col>
                                    <Col>
                                        <Label for="country">Country</Label>
                                        <Input type="country" name="country"
                                               defaultValue={registrationData.country}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="guestName">Guest Name</Label>
                                        <Input type="guestName" name="guestName"
                                               defaultValue={registrationData.guestName}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Row>
                                    <Col>
                                        <legend>Venue Preference</legend>
                                        {venueErrorDiv}
                                        <FormGroup>
                                            <Label>
                                                <Input defaultChecked={dvilleChecked}
                                                       type="radio" value="Douglasville" name="venue"/>{' '}
                                                In or around Douglasville
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <Input defaultChecked={atlChecked}
                                                       type="radio" value="Atlanta" name="venue"/>{' '}
                                                In or around Atlanta
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <Input type="radio" defaultChecked={anyChecked}
                                                       value="Anywhere" name="venue"/>{' '}
                                                As long as my friends are there, I will drive any distance in Georgia :)
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <legend>Ticket Price - Would ticket price affect your venue preference?</legend>
                                        {costErrorDiv}
                                        <FormGroup>
                                            <Label>
                                                <Input defaultChecked={costYesChecked}
                                                       type="radio" value="Yes" name="cost"/>{' '}
                                                Yes
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <Input defaultChecked={costNoChecked}
                                                       type="radio" value="No" name="cost"/>{' '}
                                                No
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                    </div>
                </Container>
                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(RegistrationForm);