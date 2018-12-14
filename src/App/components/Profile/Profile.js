import React, { Component } from 'react';
// Tools
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import history from '../../history';
// Components
import DetailsNav from './Details/DetailsNav';
import Details from './Details/Details';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.unlisten = null;
    this.pathname = null;
  }

  componentDidMount() {
    if (this.props.socket) {
      if (this.props.socket.projectId) {
        this.props.socket.emit('outOfProjectWorkSpace');
        this.props.unmountAudio();
        this.props.unmountLyrics();
        this.props.unmountCollaborator();
        this.props.unmountCurrentProject();
        this.props.unmountChat();
        delete this.props.socket.projectId;
      }
    }
    this.getLoggedInProfile();
    this.props.togglePageView('projects');
    this.location = history.location.pathname;
    this.unlisten = history.listen(location => {
      let currentLocation = location.pathname;
      if (this.pathname !== currentLocation) {
        this.pathname = currentLocation;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.state && nextProps.history.location.state.deleteStatus) {
      console.log(`Project: ${nextProps.history.location.state.projectName} deleted successfully`);
      const username = this.props.auth.getUserName();
      history.push({ pathname: '/' + username });
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getLoggedInProfile() {
    this.props.getProfile().then(res => {
      const username = this.props.auth.getUserName();
      // this.props.fetchProfile(username);
      this.props.fetchProjects(username, '');
      this.props.toggleActiveTab('/' + username);
    });
  }

  render() {
    return (
      <div className="profile-body">
        <NotificationContainer />
        <div className="container main_content profile">
          {this.props.auth.isAuthenticated && this.props.socket && this.props.profile.profile.username ? (
            <React.Fragment>
              <DetailsNav />
              <Details socket={this.props.socket} />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, profile, projects }) {
  return { auth: auth.authentication, profile, projects: projects.myProjects };
}

export default connect(
  mapStateToProps,
  {
    getProfile: actions.authActions.getProfile,
    fetchProfile: actions.profileActions.fetchProfile,
    fetchGroups: actions.groupsActions.fetchGroups,
    fetchProjects: actions.projectsActions.fetchProjects,
    toggleActiveTab: actions.navActions.toggleActiveTab,
    togglePageView: actions.profileActions.togglePageView,
    unmountAudio: actions.audioActions.unmountAudio,
    unmountLyrics: actions.segmentsActions.unmountLyrics,
    unmountCollaborator: actions.collaboratorActions.unmountCollaborator,
    unmountCurrentProject: actions.projectsActions.unmountCurrentProject,
    unmountChat: actions.chatActions.unmountChat
  }
)(withRouter(Profile));
