import React, {Fragment} from "react";
import Badge from "reactstrap/es/Badge";
import {Container, Row, Col} from "reactstrap";

const Info = (props) => (
    <div className="my-2">
        <Container>

            <h5><Badge color="secondary">Event Date</Badge></h5>
            <p><b>Saturday, October 5, 2019</b></p>
            <p><b>7pm</b></p>
            <br/>

            <h5><Badge color="secondary">Location</Badge></h5>
            <Row>
                <Col>
                    The Loft at Due South<br/>
                    302 Clover Reach<br/>
                    Peachtree City, GA 30269
                </Col>
                <Col>
                    <p><a href="https://theloftatduesouth.com" target="_blank"
                          rel="noopener noreferrer">https://theloftatduesouth.com</a></p>

                    <Badge href="https://goo.gl/maps/CrkSRiWQooDB3D2AA" target="_blank" color="primary"
                           rel="noopener noreferrer">Map It</Badge>
                </Col>
            </Row>
            <br/>

            <h5><Badge color="secondary">Cost</Badge></h5>
            <p>$75 per person (includes food)
                <br/>
                &nbsp;&nbsp;&nbsp;<b>--</b>Cash Bar Available<br/>
                &nbsp;&nbsp;&nbsp;<b>--</b>Live DJ and Dancing<br/>
                &nbsp;&nbsp;&nbsp;<b>--</b>Fun Trivia and Door Prizes<br/>

            </p>
            <br/>
            {!props.authenticated &&
            <Fragment>
                <h5><Badge color="secondary">Next Steps</Badge></h5>
                <p>
                    To get started, click the blue 'Log In' button above. If this is your first time, it will prompt you
                    to create a login. After logging in, you can complete your Registration Profile. By completing the
                    Registration Profile, you have successfully RSVP'd to the reunion. Once registered, you will receive
                    instructions on how to pay for you and your guest.
                </p>
            </Fragment>
            }
        </Container>
    </div>

);

export default Info;
