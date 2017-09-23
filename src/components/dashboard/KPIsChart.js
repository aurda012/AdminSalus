import React, { Component } from 'react';
import firebase from '../../config/database'
import ReactEcharts from '../ReactECharts';
import CHARTCONFIG from '../../constants/ChartConfig';

class KPIChart extends Component {

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
    const area = {};

    area.options = {
      color: 'rgba(60,201,150,0.035)',
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Redeemed'],
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      toolbox: {
        show: false
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['Today', 'This Week', 'This Month', 'Total'],
          axisLine: {
            lineStyle: {
              color: 'rgba(50,201,150, 1.0)'
            }
          },
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },

          splitLine: {
            lineStyle: {
              color: 'rgba(60,201,150,0.035)'
            }
          }
        }
      ],
      yAxis: [
        {
          max: 500,
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(50,201,150, 1.0)'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: CHARTCONFIG.color.splitArea
            }
          }
        }
      ],
      series: [
        {
          name: 'Redeemed',
          type: 'bar',
          data: [0, 0, 0, 0],
          barWidth: 60,
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.info
            }
          },
          lineStyle: {
            normal: {
              color: CHARTCONFIG.color.info
            }
          },
          areaStyle: {
            normal: {
              color: CHARTCONFIG.color.info
            }
          },
          symbol: 'diamond'
        },
      ]
    };
    return (
      <ReactEcharts style={{height: '400px'}} option={area.options} showLoading={false} />
    )
  }
}

export default KPIChart;
