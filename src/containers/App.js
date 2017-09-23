import React, { Component } from 'react';
import firebase from '../config/database'
import QueueAnim from 'rc-queue-anim';
import KPIsChart from '../components/dashboard/KPIsChart';
import StatBoxes from '../components/dashboard/statboxes';

const Main = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header card-header-icon" data-background-color="rose" style={{ paddingBottom: "10px" }}>
          <i className="material-icons" style={{ fontSize: "32px" }}>equalizer</i>
        </div>
        <div className="card-content">
          <KPIsChart />
        </div>
      </div>
    </div>
    {/*<div className="col-md-6">*/}
      {/*<div className="card">*/}
        {/*<div className="card-header card-header-icon" data-background-color="rose" style={{ paddingBottom: "10px" }}>*/}
          {/*<i className="material-icons" style={{ fontSize: "32px" }}>pie_chart_outlined</i>*/}
        {/*</div>*/}
        {/*<div className="card-content">*/}
          {/*<AcquisitionChart />*/}
        {/*</div>*/}
      {/*</div>*/}
    {/*</div>*/}
  </div>
);

class Insights extends Component {

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
    this.authListener = this.authListener.bind(this);
    // this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillMount() {
  }

  authListener() {
    const setUser = (user) => {
      this.setState({user: user})
    };

    const setVendor = (vendor) => {
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        // User is signed in.
        console.log("User has Logged  in Master");
        var vendorInfo = firebase.database().ref(`vendors/${user.uid}`);
        vendorInfo.on('value', function (snapshot) {
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

  handleSubmit() {
    //alert('Username: ' + this.state.username+ " Password: "+this.state.password);
    this.updateData();

  }


  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <Main />
          <div key="2"><StatBoxes /></div>
        </QueueAnim>

      </div>
    );
  }
}

export default Insights;
