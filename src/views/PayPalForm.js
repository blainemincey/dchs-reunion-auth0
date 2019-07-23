import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row, ButtonGroup,Button} from "reactstrap";
import { PayPalButton } from "react-paypal-button-v2";
import moment from 'moment';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class PayPalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            showLoading: true,
            paymentData: '',
            amountSelected: 75
        }

        this.mdbStitchSaveTransactionWebhook = process.env.REACT_APP_MONGODB_STITCH_SAVE_TRANSACTION_WEBHOOK;
        this.mdbStitchLoadPaymentDataWebhook = process.env.REACT_APP_MONGODB_STITCH_LOAD_PAYMENT_DATA_WEBHOOK;
        this.payPalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

        this.loadExistingPaymentData = this.loadExistingPaymentData.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(amountSelected) {
        this.setState({ amountSelected: amountSelected });
    }

    async loadExistingPaymentData() {
        console.log("Loading existing payment payment data.");
        let url = this.mdbStitchLoadPaymentDataWebhook + this.state.user.email;
        console.log('webhook url: ' + url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if (response.ok) {
                console.log('Get payment response ok!');
                let json = await response.json();
                console.log(json);
                this.setState({
                    paymentData: json
                });

                return true;
            } else {
                console.log("Response Error!");
                console.log("Unable to load data for email: " + this.state.user.email);

                return false;
            }
        } catch (e) {
            console.log('Error on post registration', e);
            return false;
        }
    }

    async componentDidMount() {
        await this.loadExistingPaymentData();
    }

    async postPayment(details, data, email) {
        console.log("Post Paypal payment.");
        try {
            let response = await fetch(this.mdbStitchSaveTransactionWebhook, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    emailAddress: email,
                    orderID: data.orderID,
                    payerID: data.payerID,
                    payment: details.purchase_units[0].amount.value
                })
            });

            if (response.ok) {
                console.log("Response ok!");
                let json = await response.json();
                console.log(json);
                console.log("Successful Paypal payment posted!");
                const {history} = this.props;
                history.push('/paymentsuccess');

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
            console.log('Error on post payment', e);
            return false;
        }

    }

    render() {

        const {user, showLoading, paymentData, amountSelected} = this.state;

        let tableData = [];
        if(paymentData.length > 0){
            tableData = paymentData.slice();
        }

        let paymentTable = '';
        if(tableData.length > 0){
            paymentTable =
                <ReactTable
                    data={tableData}
                    columns={[
                        {
                            Header: "Date Paid",
                            id: 'datePaid',
                            accessor: d => {
                                return moment(parseInt(d.datePaidTS)).format('MMMM Do YYYY, h:mm:ss a');
                            },
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Payer ID",
                            accessor: "payerID",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Order ID",
                            accessor: "orderID",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        },
                        {
                            Header: "Payment",
                            accessor: "payment",
                            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                        }
                    ]}
                    className="-striped -highlight"
                    defaultPageSize={3}
                    showPagination={false}
                    sortable={false}
                >

                </ReactTable>;
        }

        let noPayments = '';
        if(paymentTable.length < 1){
            noPayments = <p>There are currently no payment records under your account.</p>;
        }

        return (

            <Container>
                <Row>
                    <Col>
                        <p>If you have not paid for your reunion ticket(s), please do so as soon as possible.</p>
                        <p>Select the number of tickets and then click the PayPal button below.</p>
                        <p><b>Payment record for:</b> {user.email}</p>
                        {noPayments}
                        {paymentTable}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>How many tickets would you like to purchase at this time?</p>
                        <ButtonGroup>
                            <Button color="primary" onClick={() => this.onRadioBtnClick(75.00)}>One</Button>
                            &nbsp;
                            <Button color="primary" onClick={() => this.onRadioBtnClick(150.00)}>Two</Button>
                        </ButtonGroup>
                        <p><b>Total: ${amountSelected}.00</b></p>

                    </Col>
                </Row>
                <Row>
                    <Col xs lg="2">
                        {showLoading ? <span>Loading PayPal...</span> : null}
                        <PayPalButton
                            amount={amountSelected}
                            onButtonReady={() => this.setState({ showLoading: false })}
                            onSuccess={(details, data) => {
                                this.postPayment(details, data, user.email);
                                return;
                            }}
                            catchError={(err) => {
                                console.log(err);
                            }}
                            options={{
                                clientId: this.payPalClientId,
                                disableFunding: "card,credit",
                                commit: true

                            }}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default withRouter(PayPalForm);