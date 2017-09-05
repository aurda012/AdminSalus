import React from 'react';
import ReactEcharts from '../ReactECharts';
import CHARTCONFIG from '../../constants/ChartConfig';

const labelTop = {
  normal: {
    show: true,
    position: 'center',
    formatter: '{b}',
    textStyle: {
      color: 'rgba(0,0,0,.54)',
      baseline: 'bottom',
      fontSize: 14
    }
  }
};

const labelFromatter = {
  normal: {
    label: {
      formatter(params) {
        return `${100 - params.value}%`;
      },
      textStyle: {
        color: 'rgba(0,0,0,.54)',
        baseline: 'bottom',
        fontSize: 12
      }
    }
  },
};
const labelBottom = {
  normal: {
    color: 'rgba(0,0,0,.1)',
    label: {
      show: true,
      position: 'center'
    },
    labelLine: {
      show: true
    }
  }
};
const radius = [65, 70];
const pie = {};

const pie1 = {};
const pie2 = {};
const pie3 = {};
const pie4 = {};

pie1.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Bounce', value: 36, label: labelTop, labelLine: {normal: {show: true}}, itemStyle: {normal: {color: CHARTCONFIG.color.success}}},
      {name: 'other', value: 64, itemStyle: labelBottom}
    ]
  }]
};

pie2.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Activation', value: 45, label: labelTop, itemStyle: {normal: {color: CHARTCONFIG.color.info}}},
      {name: 'other', value: 55, itemStyle: labelBottom}
    ]
  }]
};
pie3.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Retention', value: 25, label: labelTop, itemStyle: {normal: {color: CHARTCONFIG.color.success}}},
      {name: 'other', value: 75, itemStyle: labelBottom}
    ]
  }]
};
pie4.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Referral', value: 75, label: labelTop, itemStyle: {normal: {color: CHARTCONFIG.color.info}}},
      {name: 'other', value: 25, itemStyle: labelBottom}
    ]
  }]
};


const Statboxes = () => (
  <div className="row">
    <div className="col-md-3">
      <div className="card">
        <div className="box-top" style={{ height: '100px', padding: "32px 25px", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          <span>46</span>
        </div>
        <div className="box-info" style={{ position: "absolute", width: "100%", top: "40%", marginTop: "-12px", textAlign: "center" }}>
          <span style={{ height: "24px", display: "inline-block", padding: "4px 10px", textTransform: "uppercase", lineHeight: "14px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,.15)", borderRadius: "1em" }}>Redeemed today</span>
        </div>
        <div className="card-header card-header-icon" data-background-color="rose" style={{ position: "absolute", marginLeft: "-30px", top: "61%", left: "50%", paddingBottom: "10px", marginTop: "-10", textAlign: "center" }}>
          <i className="material-icons" style={{ fontSize: "36px" }}>touch_app</i>
        </div>
        <div className="box-bottom" style={{ height: '150px', borderTop: "1px solid rgba(0,0,0,.15)", padding: "", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          {/*<ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />*/}
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card">
        <div className="box-top" style={{ height: '100px', padding: "32px 25px", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          <span>117</span>
        </div>
        <div className="box-info" style={{ position: "absolute", width: "100%", top: "40%", marginTop: "-12px", textAlign: "center" }}>
          <span style={{ height: "24px", display: "inline-block", padding: "4px 10px", textTransform: "uppercase", lineHeight: "14px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,.15)", borderRadius: "1em" }}>Redeemed this week</span>
        </div>
        <div className="card-header card-header-icon" data-background-color="rose" style={{ position: "absolute", marginLeft: "-30px", top: "61%", left: "50%", paddingBottom: "10px", marginTop: "-10", textAlign: "center" }}>
          <i className="material-icons" style={{ fontSize: "36px" }}>trending_up</i>
        </div>
        <div className="box-bottom" style={{ height: '150px', borderTop: "1px solid rgba(0,0,0,.15)", padding: "", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          {/*<ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />*/}
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card">
        <div className="box-top" style={{ height: '100px', padding: "32px 25px", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          <span>231</span>
        </div>
        <div className="box-info" style={{ position: "absolute", width: "100%", top: "40%", marginTop: "-12px", textAlign: "center" }}>
          <span style={{ height: "24px", display: "inline-block", padding: "4px 10px", textTransform: "uppercase", lineHeight: "14px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,.15)", borderRadius: "1em" }}>Redeemed this month</span>
        </div>
        <div className="card-header card-header-icon" data-background-color="rose" style={{ position: "absolute", marginLeft: "-30px", top: "61%", left: "50%", paddingBottom: "10px", marginTop: "-10", textAlign: "center" }}>
          <i className="material-icons" style={{ fontSize: "36px" }}>today</i>
        </div>
        <div className="box-bottom" style={{ height: '150px', borderTop: "1px solid rgba(0,0,0,.15)", padding: "", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          {/*<ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />*/}
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card">
        <div className="box-top" style={{ height: '100px', padding: "32px 25px", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          <span>458</span>
        </div>
        <div className="box-info" style={{ position: "absolute", width: "100%", top: "40%", marginTop: "-12px", textAlign: "center" }}>
          <span style={{ height: "24px", display: "inline-block", padding: "4px 10px", textTransform: "uppercase", lineHeight: "14px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,.15)", borderRadius: "1em" }}>Total Redeemed</span>
        </div>
        <div className="card-header card-header-icon" data-background-color="rose" style={{ position: "absolute", marginLeft: "-30px", top: "61%", left: "50%", paddingBottom: "10px", marginTop: "-10", textAlign: "center" }}>
          <i className="material-icons" style={{ fontSize: "36px" }}>group</i>
        </div>
        <div className="box-bottom" style={{ height: '150px', borderTop: "1px solid rgba(0,0,0,.15)", padding: "", fontSize: "40px", lineHeight: "40px", textAlign: "center" }}>
          {/*<ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />*/}
        </div>
      </div>
    </div>
  </div>
);

export default Statboxes;
