/* eslint-disable max-len */
import React, { Component } from 'react';

class Public extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse"
                      data-target="#navigation-example-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <a className="navbar-brand"><img src="assets/img/SalusS.png" width="50"></img></a>
            </div>
          </div>
        </nav>
        <div className="wrapper wrapper-full-page">
          <div className="full-page login-page" data-image="assets/img/salus.png">

                    { this.props.children }

            <footer className="footer">
              <div className="container">
                <nav className="pull-left">
                  <ul>

                  </ul>
                </nav>
                <p className="copyright pull-right">

                  &copy;

                  2017 Salus App LLC


                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

Public.propTypes = {
  children: React.PropTypes.node,
};

export default Public;
