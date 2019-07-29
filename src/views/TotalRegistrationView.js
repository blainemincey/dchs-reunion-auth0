import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";
import ReactTable from 'react-table';
import "react-table/react-table.css";

class TotalRegistrationView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            regData: []
        }

        this.mdbStitchGetTotalRegistrations = process.env.REACT_APP_MONGODB_STITCH_TOTAL_REGISTRATION_WEBHOOK;

        this.loadExistingRegistrationData = this.loadExistingRegistrationData.bind(this);
    }

    async loadExistingRegistrationData() {
        console.log("Loading existing registration data.");
        let url = this.mdbStitchGetTotalRegistrations;
        console.log('webhook url: ' + url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if (response.ok) {
                console.log('Get registration data!');
                let json = await response.json();
                console.log(json);
                this.setState({
                    regData: json
                });

                return true;
            } else {
                console.log("Response Error!");
                return false;
            }
        } catch (e) {
            console.log('Error on get registration data', e);
            return false;
        }
    }

    async componentDidMount() {
        await this.loadExistingRegistrationData();
    }

    toCurrency(numberString) {
        var arrayVal = Object.entries(numberString).map(item => item[1]);
        return arrayVal;
    }

    render() {

        const {user, regData} = this.state;

        let tableData = [];
        let registrationCount = '';
        if(regData.length > 0){
            tableData = regData.slice();
            registrationCount = regData.length;
        }

        let regCountDisplay = '';
        if(registrationCount > 0) {
            regCountDisplay = <p><b>Total Number of Registrations: </b>{registrationCount}</p>;
        }

        let registrationTable = '';
        if(tableData.length > 0){
            registrationTable =
                <ReactTable
                    data={tableData}
                    columns={[
                        {
                            Header: "First Name",
                            accessor: 'firstName',
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Last Name",
                            accessor: "lastName",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Guest Name",
                            accessor: "guestName",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Payment",
                            accessor: "totalPayment",
                            Cell: row => <div style={{ textAlign: "center" }}>${this.toCurrency(row.value)}.00</div>
                        }
                    ]}
                    className="-striped -highlight"
                    defaultPageSize={10}
                    showPagination={true}
                    sortable={true}
                >

                </ReactTable>;
        }

        return (

            <Container>
                <Row>
                    <Col>
                        <p><b>Viewing Total Registrations as: </b> {user.email}</p>
                        {regCountDisplay}
                        {registrationTable}
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default withRouter(TotalRegistrationView);