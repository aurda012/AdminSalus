import React, { Component } from 'react';
import Master from './layout/Admin'
import Insights from './containers/App'
import Fireadmin from './containers/Fireadmin'
import Push from './containers/EditProfile'
import EditPayment from './containers/EditPayment'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

class Dashboard extends Component {

  //Prints the dynamic routes that we need for menu of type fireadmin
  getFireAdminRoutes(item){
    if(item.link=="fireadmin"){
      return (<Route path={"/fireadmin/"+item.path} component={Fireadmin}/>)
    }else{

    }
  }

  //Prints the dynamic routes that we need for menu of type fireadmin
  getFireAdminSubRoutes(item){
    if(item.link=="fireadmin"){
      return (<Route path={"/fireadmin/"+item.path+"/:sub"} component={Fireadmin}/>)
    }else{

    }
  }

  //Prints the Routes
  /*
  {Config.adminConfig.menu.map(this.getFireAdminRoutes)}
  {Config.adminConfig.menu.map(this.getFireAdminSubRoutes)}
  */
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Master}>
          {/* make them children of `Master` */}
          <IndexRoute component={Insights}></IndexRoute>
          <Route path="/app" component={Dashboard}/>
          <Route path="/edit-profile" component={Push}/>
          <Route path="/edit-payment" component={EditPayment}/>
          <Route path="/fireadmin" component={Fireadmin}/>
          <Route path="/fireadmin/:sub" component={Fireadmin}/>


        </Route>
      </Router>
    );
  }

}

export default Dashboard;
