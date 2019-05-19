import React, { Component } from 'react';
// tools
import { connect } from 'react-redux';
// services
import * as actions from './actions';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
//components
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home,
  Profile,
  Nav,
  Confirmation,
  PublicProfile
} from './components';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, socket, childProps } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div className="wrapper">
          {childProps.isAuthenticated ? (
            <Nav {...childProps} socket={socket} />
          ) : null}
          <Switch>
            <Route exact path="/" render={props => <Home />} />
            <Route exact path="/thanks" render={props => <Confirmation />} />
            <Route
              exact
              path="/:userName"
              render={props =>
                !childProps.isAuthenticated && !socket ? (
                  <PublicProfile {...childProps} />
                ) : (
                    <Profile {...childProps} socket={socket} />
                  )
              }
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {
    authenticated: actions.navActions.authenticated,
  }
)(Routes);


