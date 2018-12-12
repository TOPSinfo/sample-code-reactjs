import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

import logo from '../../../assets/logo.png';


class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goHome = e => {
    history.push('/');
  };

  
  render() {
    return (
      <div className="navigation">
        <div className="logo-wrapper" onClick={this.goHome}>
          <img src={logo} className="nav-logo" alt="The Labz Logo" />
        </div>
        {this.props.auth.isAuthenticated && this.props.socket && this.state.userName ? (
          <div className="nav-items">
            <div className="nav-item profile-container">
              <h5 className="adminName">
                Student Info
              </h5>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect()(withRouter(NavMenu));
