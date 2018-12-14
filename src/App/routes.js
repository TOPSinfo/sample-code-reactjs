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
  Login,
  Nav,
  Invites,
  Project,
  Registration,
  Confirmation,
  Payment,
  PublicProfile,
  PublicProject,
  ErrorBoundary
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
              path="/register"
              render={props => <Registration {...childProps} />}
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...childProps} />}
            />
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
            <Route
              exact
              path="/project/:projectName"
              render={props =>
                !childProps.isAuthenticated ? (
                  <ErrorBoundary>
                    <PublicProject/>
                  </ErrorBoundary>
                ) : (
                    <Project
                      auth={auth}
                      {...props}
                      {...childProps}
                      socket={socket}
                    />
                  )
              }
            />
            <Route
              exact
              path="/project/:projectName/registration"
              render={props =>
                !childProps.isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                    <Project registration={true} auth={auth}
                      {...props}
                      {...childProps}
                      socket={socket} />
                  )
              }
            />
            <Route
              exact
              path="/:username/pending_invites"
              render={props =>
                !childProps.isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                    <Invites {...childProps} socket={socket} />
                  )
              }
            />
            <Route
              exact
              path="/payment"
              render={props =>
                !childProps.isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                    <Payment {...childProps} socket={socket} />
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


