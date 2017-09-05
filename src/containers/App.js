import React from 'react';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from '../components/dashboard/KPIsChart';
import AcquisitionChart from '../components/dashboard/AcquisitionChart';
import StatBoxes from '../components/dashboard/statboxes';
import EngagementStats from '../components/dashboard/EngagementStats';
import BenchmarkChart from '../components/dashboard/BenchmarkChart';

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

const Engagement = () => (
  <div className="box box-default">
    <div className="box-body">
      <div className="row">
        <div className="col-xl-8">
          <div className="box box-transparent">
            <div className="box-header">Engagement</div>
            <div className="box-body">
              <div className="row text-center metrics">
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">2.6M</span>
                  <span className="metric-info">Visits</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">4.5M</span>
                  <span className="metric-info">Users</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">08:03</span>
                  <span className="metric-info">Visit Duration</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">5.25</span>
                  <span className="metric-info">Pages per Visit</span>
                </div>
              </div>

              <EngagementStats />
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-transparent">
            <div className="box-header">Benchmark</div>
            <div className="box-body">
              <BenchmarkChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Insights = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <Main />
      <div key="2"><StatBoxes /></div>
    </QueueAnim>

  </div>
);

export default Insights;
