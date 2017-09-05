import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import firebase from '../config/database'
import Config from '../config/app';
import { browserHistory } from 'react-router';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            companyName: '',
            phoneNumber: '',
            error: '',
            plan: '',
            cardNumber: '4242424242424242',
            expYear: 2020,
            expMonth: 12,
            name: '',
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
        this.handleChangeExpMonth = this.handleChangeExpMonth.bind(this);
        this.handleChangeExpYear = this.handleChangeExpYear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleChangeCompany(event) {
        this.setState({
            companyName: event.target.value
        });
    }
    handleChangePhone(event) {
        this.setState({
            phoneNumber: event.target.value
        });
    }
    handleChangeCardNumber(event) {
        this.setState({
            cardNumber: event.target.value
        });
    }
    handleChangeExpMonth(event) {
        this.setState({
            expMonth: event.target.value
        });
    }
    handleChangeExpYear(event) {
        this.setState({
            expYear: event.target.value
        });
    }
    handleSubmit(event) {
        //alert('Username: ' + this.state.username+ " Password: "+this.state.password);
        this.authenticate(this.state.username, this.state.password, this.state.companyName, this.state.phoneNumber);
        event.preventDefault();
    }
    deleteCustomer(cust_id) {
        fetch('https://api.stripe.com/v1/customers/' + cust_id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer sk_test_7JptRhoLDP2UzOEaPnaDUmQi'
            },
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    }
    createCard(cust_id) {
        const displayError = (error) => {
            this.setState({
                error: error
            });
        };
        fetch('https://api.stripe.com/v1/customers/' + cust_id + '/sources', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer sk_test_7JptRhoLDP2UzOEaPnaDUmQi'
            },
            body: 'source[object]=card&source[number]=' + this.state.cardNumber + '&source[exp_month]=' + this.state.expMonth + '&source[exp_year]=' + this.state.expYear
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.error) {
                var errorCode = responseJson.error.code;
                var errorMessage = responseJson.error.message;
                console.log(responseJson.error.message);
                displayError(responseJson.error.message);
                this.deleteCustomer(cust_id);
            } else {
                this.createSubscriptions(cust_id);
                console.log(responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    createSubscriptions(cust_id) {
        const displayError = (error) => {
            this.setState({
                error: error
            });
        };
        fetch('https://api.stripe.com/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer sk_test_7JptRhoLDP2UzOEaPnaDUmQi'
            },
            body: 'customer=' + cust_id + '&plan=' + this.state.plan
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.error) {
                var errorCode = responseJson.error.code;
                var errorMessage = responseJson.error.message;
                console.log(responseJson.error.message);
                displayError(responseJson.error.message);
                this.deleteCustomer(cust_id);
            } else {
                this.createFireBaseUser(cust_id);
                console.log(responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    createFireBaseUser(cust_id) {
        const displayError = (error) => {
            this.setState({
                error: error
            });
        };
        const company = this.state.companyName;
        const phoneNum = this.state.phoneNumber;
        firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then(function(data) {
            console.log("Yes, user is logged in");
            var vendor = {
                website: "",
                cust_id: cust_id,
                image : "https://firebasestorage.googleapis.com/v0/b/salus-4b513.appspot.com/o/SalusPlaceholder.png?alt=media&token=05dc65f5-f5bc-481b-8fb9-b2aee4b1dffc",
                name: company,
                phone: phoneNum,
                address: "",
                uid: data.uid,
                offers : {
                  offer1 : {
                    image : "https://firebasestorage.googleapis.com/v0/b/salus-4b513.appspot.com/o/SalusPlaceholder.png?alt=media&token=05dc65f5-f5bc-481b-8fb9-b2aee4b1dffc",
                    points : 0,
                    title : "",
                  },
                  offer2 : {
                    image : "https://firebasestorage.googleapis.com/v0/b/salus-4b513.appspot.com/o/SalusPlaceholder.png?alt=media&token=05dc65f5-f5bc-481b-8fb9-b2aee4b1dffc",
                    points : 0,
                    title : "",
                  },
                  offer3 : {
                    image : "https://firebasestorage.googleapis.com/v0/b/salus-4b513.appspot.com/o/SalusPlaceholder.png?alt=media&token=05dc65f5-f5bc-481b-8fb9-b2aee4b1dffc",
                    points : 0,
                    title : "",
                  }
                },
            };
            firebase.database().ref().child('vendors').child(data.uid).update(vendor);
            browserHistory.push('/');
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.message);
            displayError(error.message);
        });
    }
    authenticate(username, password, companyName, phoneNumber) {
        const displayError = (error) => {
            this.setState({
                error: error
            });
        };
        if (username == '' || password == '') {
            displayError('username and password are required.');
        } else if (password.length < 6) {
            displayError('Password Minimum Length – 6.');
        } else {
            fetch('https://api.stripe.com/v1/customers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_7JptRhoLDP2UzOEaPnaDUmQi'
                },
                body: 'email=' + username + '&description=' + username
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.error) {
                    var errorCode = responseJson.error.code;
                    var errorMessage = responseJson.error.message;
                    console.log(responseJson.error.message);
                    displayError(responseJson.error.message);
                } else {
                    this.createCard(responseJson.id);
                    console.log(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

  render() {


    return (
      <div className="content" style={{ paddingTop: '14vh' }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
              <form onSubmit={this.handleSubmit}>
                <div className="card card-login card-hidden">
                  <div className="card-header text-center" style={{ marginLeft: '125px', marginRight: '125px' }} data-background-color="rose">
                    <h4 className="card-title">Signup</h4>

                  </div>

                  <div className="card-content">
                    <h4>{this.state.error}</h4>
                      <Row>
                        <Col md={ 6 }>
                          <div className="input-group">
                                              <span className="input-group-addon">
                                                  <i className="material-icons">business</i>
                                              </span>
                            <div className="form-group label-floating">
                              <label className="control-label">Company Name</label>
                                <input type="text" value={this.state.companyName} onChange={this.handleChangeCompany} className="form-control" />
                            </div>
                          </div>
                        </Col>
                        <Col md={ 6 }>
                          <div className="input-group">
                                              <span className="input-group-addon">
                                                  <i className="material-icons">phone</i>
                                              </span>
                            <div className="form-group label-floating">
                              <label className="control-label">Phone Number</label>
                              <input type="text" value={this.state.phoneNumber} onChange={this.handleChangePhone} className="form-control" />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={ 6 }>
                          <div className="input-group">
                                              <span className="input-group-addon">
                                                  <i className="material-icons">email</i>
                                              </span>
                            <div className="form-group label-floating">
                              <label className="control-label">Email address</label>
                              <input type="email" value={this.state.username} onChange={this.handleChangeUsername} className="form-control" />
                            </div>
                          </div>
                        </Col>
                        <Col md={ 6 }>
                          <div className="input-group">
                                              <span className="input-group-addon">
                                                  <i className="material-icons">lock_outline</i>
                                              </span>
                            <div className="form-group label-floating">
                              <label className="control-label">Password</label>
                              <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" />
                            </div>
                          </div>
                        </Col>
                      </Row>
                  </div>
                  <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Col xs={10} xsOffset={1}>
                      <Alert style={{ backgroundColor: "#3CC996" }}>
                        <strong>Select your plan.</strong>. Your subscription will begin immediately and be renewed based off of the selected plan. Cancel anytime.
                      </Alert>
                      <div className="Plans" style={{ textAlign: 'center', border: '1px solid #eee', borderRadius: '3px' }}>
                        <label key="SalusYearly" className="Plan" style={{ display: 'block', padding: '15px', margin: '0', borderBottom: '1px solid #eee' }}>
                          <input
                            style={{ marginRight: '10px' }}
                            type="radio"
                            name="plan"
                            value="SalusYearly"
                            checked={ "SalusYearly" === this.state.plan }
                            onChange={() => { this.setState({ plan: "SalusYearly" }); }}
                          />
                          $499.99 - Salus Yearly Subscription
                        </label>
                        <label key="SalusMonthly" className="Plan" style={{ display: 'block', padding: '15px', margin: '0' }}>
                          <input
                            style={{ marginRight: '10px' }}
                            type="radio"
                            name="plan"
                            value="SalusMonthly"
                            checked={ "SalusMonthly" === this.state.plan }
                            onChange={() => { this.setState({ plan: "SalusMonthly" }); }}
                          />
                          $49.99 - Salus Monthly Subscription
                        </label>
                      </div>
                      <div className="CardForm">
                        <label className="Label SecureStripe"><i className="fa fa-lock" /> Payments securely processed by Stripe</label>
                        <Row>
                          <Col md={ 8 }>
                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                                                </span>
                              <div className="form-group label-floating">
                                <label className="control-label">Card number</label>
                                <input type="number" value={this.state.cardNumber} onChange={this.handleChangeCardNumber} className="form-control" />
                              </div>
                            </div>
                          </Col>
                          <Col md={ 2 }>
                            <div className="input-group">
                              <div className="form-group label-floating">
                                <label className="control-label">MM</label>
                                <input type="number" value={this.state.expMonth} onChange={this.handleChangeExpMonth} className="form-control" />
                              </div>
                            </div>
                          </Col>
                          <Col md={ 2 }>
                            <div className="input-group">
                              <div className="form-group label-floating">
                                <label className="control-label">YY</label>
                                <input type="number" value={this.state.expYear} onChange={this.handleChangeExpYear} className="form-control" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <div className="footer text-center">
                    <input type="submit" className="btn btn-fill btn-rose" style={{ width: '275px' }} value={this.state.login} />

                  </div>
                  <div className="text-center" style={{ marginTop: "10px" }}>

                    <label>Already have an account?</label> <a href="/login">Login Here.</a>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Signup;
