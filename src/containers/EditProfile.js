import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import firebase from '../config/database'
import Image from '../components/fields/Image.js'
import Config from '../config/app';
import { browserHistory } from 'react-router';

class App extends Component {

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
      user: {},
      vendor: {},
      companyPic: "https://firebasestorage.googleapis.com/v0/b/salus-4b513.appspot.com/o/SalusPlaceholder.png?alt=media&token=05dc65f5-f5bc-481b-8fb9-b2aee4b1dffc",
    };
    this.authListener = this.authListener.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeExpMonth = this.handleChangeExpMonth.bind(this);
    this.handleChangeExpYear = this.handleChangeExpYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener(){
    const setUser=(user)=>{
      this.setState({user:user})
    };
    const setVendor=(vendor)=>{
      this.setState({
        vendor:vendor,
        companyName: vendor.name,
        phoneNumber: vendor.phone,
        companyPic: vendor.image,
      })
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        // User is signed in.
        console.log("User has Logged  in Master");
        var vendorInfo = firebase.database().ref(`vendors/${user.uid}`);
        vendorInfo.on('value', function(snapshot) {
          setVendor(snapshot.val());
          console.log(snapshot.val());
        });
      } else {
        // No user is signed in.
        console.log("User has logged out Master");
      }
    });
  }

  // vendorListener(){
  //   const setVendor=(vendor)=>{
  //     this.setState({vendor:vendor})
  //   };
  //
  //   firebase.database().ref(`vendors/${this.state.user.uid}`).on('value', function(snapshot) {
  //     if (snapshot) {
  //       setVendor(snapshot.val());
  //       // User is signed in.
  //       console.log("Vendor Set");
  //     } else {
  //       // No user is signed in.
  //       console.log("Vendor Not Set");
  //     }
  //   });
  // }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
    console.log(event.target.value);
  }
  handleChangePicture(event) {
    this.setState({
      companyPic: event.target.value
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

  getDataFromFirebase(firebasePath){

  }

  updateAction(key,value,dorefresh=false){
    var firebasePath=(this.props.route.path.replace("/fireadmin/","").replace(":sub",""))+(this.props.params&&this.props.params.sub?this.props.params.sub:"").replace(/\+/g,"/");
    console.log("firebasePath from update:"+firebasePath)
    console.log('Update '+key+" into "+value);
    if(key=="DIRECT_VALUE_OF_CURRENT_PATH"){
      console.log("DIRECT_VALUE_OF_CURRENT_PATH")
      firebase.database().ref(firebasePath).set(value);
    }else if(key=="NAME_OF_THE_NEW_KEY"||key=="VALUE_OF_THE_NEW_KEY"){
      console.log("THE_NEW_KEY")
      var updateObj={};
      updateObj[key]=value;
      this.setState(updateObj);
      console.log(updateObj);
    }else{
      console.log("Normal update")
      firebase.database().ref(firebasePath+"/"+key).set(value).then(()=>{
        console.log("Data is updated");
        console.log("Do refresh "+dorefresh);
        if(dorefresh){
          this.resetDataFunction();
        }
      });
    }
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
      <div className="container-fluid no-breadcrumbs page-dashboard">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="card">
                <div className="content">
                  <div className="card-header text-center" style={{ marginLeft: '125px', marginRight: '125px' }} data-background-color="rose">
                    <h4 className="card-title">Edit Profile</h4>

                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="card-content">
                      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '15px' }}>
                        <Image theKey="image" value={this.state.companyPic}  updateAction={this.handleChangePicture} />
                      </div>
                      <h4>{this.state.error}</h4>
                      <div style={{ marginRight: '10px' }}>
                        <Row>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">business_center</i>
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
                                                      <i className="material-icons">business</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">Street Address</label>
                                <input type="email" value={this.state.username} onChange={this.handleChangeUsername} className="form-control" />
                              </div>
                            </div>
                          </Col>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">location_on</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">City</label>
                                <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">location_on</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">State</label>
                                <input type="text" value="FL" className="form-control" />
                              </div>
                            </div>
                          </Col>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">location_on</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">Zip Code</label>
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
                    </div>
                    <div className="footer text-center" style={{ marginBottom: '20px' }}>
                      <input type="submit" className="btn btn-fill btn-rose" style={{ width: '275px' }} value="Update Profile" />

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
export default App;
