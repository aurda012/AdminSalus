import React from 'react';

import './Plans.scss';

class Plans extends React.Component {
  constructor(props) {
    super(props);
    this.state = { plan: props.currentPlan || 'PortalMonthly' };
  }

  render() {
    return (
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
    );
  }
}

export default Plans;
