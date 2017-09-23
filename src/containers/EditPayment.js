import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeWithTracker } from 'react-komposer';
import { Row, Col, Alert } from 'react-bootstrap';
import firebase from '../config/database'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Vendors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      cardNumber: '',
      expYear: '',
      expMonth: '',
      name: '',
      user: {},
      vendors: {},
    };

    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeExpMonth = this.handleChangeExpMonth.bind(this);
    this.handleChangeExpYear = this.handleChangeExpYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillMount() {
  }

  authListener(){
    const setUser=(user)=>{
      this.setState({user:user})
    };

    const setVendor=(vendor)=>{
      this.setState({
        vendor: vendor,
        companyPic: vendor.image,
        companyName: vendor.name,
        phoneNumber: vendor.phone,
        website: vendor.website,
        street: vendor.street,
        city: vendor.city,
        state: vendor.state,
        zip: vendor.zip,
      })
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        // User is signed in.
        console.log("User has Logged  in Master");
        var vendorInfo = firebase.database().ref(`vendors/${user.uid}`);
        vendorInfo.on('value', function(snapshot) {
          if (snapshot) {
            const vendor = snapshot.val();
            setVendor(vendor);
            console.log()
          }
        });
      } else {
        // No user is signed in.
        console.log("User has logged out Master");
      }
    });
  }

  defaultCard(card_id) {
    fetch('https://api.stripe.com/v1/customers/' + this.state.vendor.cust_id + '/default_source', {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_7JptRhoLDP2UzOEaPnaDUmQi'
      },
      body: 'default_source=' + card_id
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
    }).catch((error) => {
      console.error(error);
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
    this.updateCard();
    event.preventDefault();
  }

  render() {
    const salusVendors = this.state.vendors;

    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="card">
              <div className="content">
                <div className="card-header text-center" style={{ marginLeft: '125px', marginRight: '125px' }} data-background-color="rose">
                  <h4 className="card-title">Edit Payment</h4>

                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="card-content">

                    <h4>{this.state.error}</h4>
                    <div style={{ marginRight: '10px' }}>
                      <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Col xs={10} xsOffset={1}>
                          <BootstrapTable
                            data={ salusVendors }
                            striped
                            hover
                            condensed
                            pagination
                            search>
                            <TableHeaderColumn dataField='name' dataSort>Manufacturer</TableHeaderColumn>
                            <TableHeaderColumn dataField='phone' dataSort>Brand Name</TableHeaderColumn>
                            {/*<TableHeaderColumn dataField='SER_RETAIL' dataSort>Retail Price</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn isKey dataField='SER_WHOLESALE' dataSort>Wholesale Price</TableHeaderColumn>*/}
                          </BootstrapTable>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="footer text-center" style={{ marginBottom: '20px' }}>
                    <input type="submit" className="btn btn-fill btn-rose" style={{ width: '275px' }} value="Update Payment" />

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Vendors;
