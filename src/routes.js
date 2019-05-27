import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import history from './history';

import {
  Login,
  Home,
  Profile
} from './Components';

class Routes extends Component {
  render() {
    const { childProps } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div className="wrapper">
          <Switch>
            <Route exact path="/login" render={props => <Login />} />
            <Route exact path="/home" render={props => <Home />} />
            <Route exact path="/profile" render={props => <Profile />} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}
export default Routes;


