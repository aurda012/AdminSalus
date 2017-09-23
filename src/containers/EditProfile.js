import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import firebase from '../config/database'
import Image from '../components/fields/Image.js'
import geocoder from 'geocoder';
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
      website: '',
      error: '',
      name: '',
      user: {},
      vendor: {},
      companyPic: '',
      zip: '',
      file: '',
      value: '',
    };
    this.handlePictureChange=this.handlePictureChange.bind(this);
    this.submitImageToFirebase=this.submitImageToFirebase.bind(this);
    this.authListener = this.authListener.bind(this);
    this.handleChangeStreet = this.handleChangeStreet.bind(this);
    this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
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

  handleChangePicture(event) {
    this.setState({
      companyPic: event
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
  handleChangeStreet(event) {
    this.setState({
      street: event.target.value
    });
  }
  handleChangeCity(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleChangeState(event) {
    this.setState({
      state: event.target.value
    });
  }
  handleChangeZip(event) {
    this.setState({
      zip: event.target.value
    });
  }
  handleChangeWebsite(event) {
    this.setState({
      website: event.target.value
    });
  }

  handleSubmit(event) {
    //alert('Username: ' + this.state.username+ " Password: "+this.state.password);
    this.updateData();
    event.preventDefault();
  }

  submitImageToFirebase(value){
    var _this=this;
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var refFile=this.state.companyName+".jpg";

    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(refFile);
    var stripedImage=value.substring(value.indexOf('base64')+7, value.length);

    newImageRef.putString(stripedImage, 'base64').then(function(snapshot) {
      console.log('Uploaded a base64 string!');
      _this.handleChangePicture(snapshot.downloadURL);
    });
  }

  handlePictureChange(e) {
    e.preventDefault();
    console.log("Start processing ....");

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      console.log("Image is in base 64 now.. Upload it");
      this.setState({
        file: file,
        value: reader.result
      });
      this.submitImageToFirebase(reader.result)

    };

    reader.readAsDataURL(file)

  }

  updateData() {

    const street = this.state.street;
    const city = this.state.city;
    const state = this.state.state;
    const pic = this.state.companyPic;
    const zip = this.state.zip;
    const website = this.state.website;
    const company = this.state.companyName;
    const phoneNum = this.state.phoneNumber;
    const uid = this.state.user.uid;

    geocoder.geocode(`${street} ${city}, ${state}`, function ( err, data ) {
      console.log(data.results[0]);
      const location = data.results[0].geometry.location;
      const formatted = data.results[0].formatted_address;
      var vendor = {
        image : pic,
        name: company,
        phone: phoneNum,
        street: street,
        city: city,
        state: state,
        zip: zip,
        address: formatted,
        website: website,
        latitude: location.lat,
        longitude: location.lng,
      };
      firebase.database().ref().child('vendors').child(uid).update(vendor);
    });

  }

  render() {

    console.log()
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
                        <div className="fileinput fileinput-new text-center" data-provides="fileinputaa">
                          <div className="fileinput-new thumbnail">
                            <img src={this.state.companyPic} alt="..." />
                          </div>
                          <div className="fileinput-preview fileinput-exists thumbnail"/>
                            <div>
                              <span className="btn btn-rose btn-round btn-file">
                                  <span className="fileinput-new">Select image</span>
                                  <span className="fileinput-exists">Change</span>
                                  <input type="file" id={this.state.companyName} name={this.state.companyName}  onChange={this.handlePictureChange} />
                              </span>
                            <a href="#pablo" className="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i className="fa fa-times"></i> Remove</a>
                          </div>
                        </div>                      </div>
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
                                                      <i className="material-icons">streetview</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">Street Address</label>
                                <input type="text" value={this.state.street} onChange={this.handleChangeStreet} className="form-control" />
                              </div>
                            </div>
                          </Col>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">location_city</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">City</label>
                                <input type="text" value={this.state.city} onChange={this.handleChangeCity} className="form-control" />
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
                                <input type="text" value={this.state.state} onChange={this.handleChangeState} className="form-control" />
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
                                <input type="text" value={this.state.zip} onChange={this.handleChangeZip} className="form-control" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={ 6 }>
                            <div className="input-group">
                                                  <span className="input-group-addon">
                                                      <i className="material-icons">web</i>
                                                  </span>
                              <div className="form-group label-floating">
                                <label className="control-label">Website</label>
                                <input type="text" value={this.state.website} onChange={this.handleChangeWebsite} className="form-control" />
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
