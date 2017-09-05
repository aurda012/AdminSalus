import React, { Component } from 'react';
import Public from './layout/Public'
import Signup from './containers/Signup'
import Login from './containers/Login'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

class Main extends Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Public}>
          {/* make them children of `Master` */}
          <IndexRoute component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>

        </Route>
      </Router>
    );
  }

}

export default Main;
