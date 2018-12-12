import React, { Component } from 'react';
// tools
import { connect } from 'react-redux';
// services
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
//components
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Header,
  StudentForm,
  StudentList
} from './components';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="wrapper">
            <Header />
          <Switch>
            <Route exact path="/" render={props => <StudentList />} />
            <Route exact path="/edit" render={props => <StudentForm />} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect()(Routes);


