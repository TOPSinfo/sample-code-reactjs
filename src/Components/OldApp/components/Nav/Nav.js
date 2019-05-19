import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popover, Overlay, DropdownButton, MenuItem, ButtonToolbar, Button, Collapse  } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import history from '../../history';

import './Nav.css';
import Notifications from './Notifications';
import logo from '../../../assets/logo.png';
import { authActions, profileActions } from '../../actions';
import FeedbackModal from './FeedbackModal';
import ApplicationSearch from './ApplicationSearch';
import { BrowserView, MobileView} from "react-device-detect";
import Config from "../../../Auth/config"
import DetailsNav from "../New-Profile/Details/DetailsNav"

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = e => {
    this.setState({
      target: e.target,
      showPopover: !this.state.showPopover,
      showFeedbackModal: false
    });

    // Close pop-over after 3 seconds
    setTimeout(() => {
      this.setState({ showPopover: false })
    }, 3000)
  };

  componentDidMount() {
    console.log("config va;lue is", Config.isMobile);
    this.setState({ userName: this.props.profile.username, profileImg: this.props.profile.img });
    this.props.socket.on('newAudioAddedNotify', data => {
      let audioName = data.audioName.split(".")[0]
      let msg = `Audio ${audioName} added to project ${data.projectName}`;
      NotificationManager.info(msg);
    });
    this.props.socket.on('audioUpdatedNotify', data => {
      let audioName = data.audioName.split(".")[0];
      let msg = `Audio ${audioName} edited in project ${data.projectName}`;
      NotificationManager.info(msg);
    });
    this.props.socket.on('newLyricsAddedNotify', data => {
      let msg = `Segment ${data.segmentName} added to project ${data.projectName}`;
      NotificationManager.info(msg);
    });
    this.props.socket.on('lyricsUpdatedNotify', data => {
      let msg = `Segment ${data.segmentName} edited in project ${data.projectName}`;
      NotificationManager.info(msg);
    });
    this.props.socket.on('audioSharedNotify', data => {
      let audioName = data.audioName.split(".")[0]
      let msg = `Audio ${audioName} is shared in ${data.projectName}`;
      NotificationManager.info(msg);
    });
  }

  componentWillReceiveProps(nextprops) {
    if (!this.props.socket.userId) {
      console.log('emitting event', nextprops.profile.id);
      this.props.socket.emit('updateUserDetails', { userId: nextprops.profile.id });
    }
    this.setState({
      userName: nextprops.profile.username,
      profileImg: nextprops.profile.img ? nextprops.profile.img : '',
    });
  }

  goHome = e => {
    let username = this.props.auth.getUserName();
    history.push('/'+username);
  };

  logout = () => {
    this.props.userHasAuthenticated(false);
    this.props.socket.disconnect();
    this.props.auth.logout();
  };

  reStartTour = () => {

    let userDetail = {
      userId : this.props.profile.id,
      showTour : 1,
      username: this.props.profile.username
    }
    this.setState({ showPopover : false});
    this.props.togglePageView('projects');
    this.props.updateUser(userDetail, true);
  }

  handleFeedbackModal = () => {
    this.setState({ showFeedbackModal: !this.state.showFeedbackModal });
  }

  render() {
    return (  
      <div className="navigation">
        <div className={Config.deviceInfo.isMobile === true ? "custom-container flex-direction-col" : "custom-container"}>
          <div className="header-navigation">
            <div className="logo-wrapper" onClick={this.goHome}>
              <img src={logo} className="nav-logo" height="50" alt="The Labz Logo" />
            </div>
            <BrowserView>
            {this.props.auth.isAuthenticated && this.props.socket && this.state.userName ? (

              <div className="header-search"> <ApplicationSearch /> </div>) : null}

            </BrowserView>

            {this.props.auth.isAuthenticated && this.props.socket && this.state.userName ? (
              <div className="header-right">
                <ul>
                  <li>
                    <span className="user-name">Hi, {this.state.userName}</span>
                    <DropdownButton
                        title={   
                        <React.Fragment>
                         
                            <a href="javascript:void(0)">                            
                              <img
                                src={this.state.profileImg ? this.state.profileImg : logo}
                                className="profile-img"
                                onClick={this.handleClick}
                                alt=""
                              />
                          </a>
                          </React.Fragment>
                        }
                        noCaret
                        id="dropdown-no-caret">
                          <MenuItem onClick={this.reStartTour}>Take Tour</MenuItem>
                          <MenuItem onClick={this.logout}>Logout</MenuItem>
                      </DropdownButton>
                  </li>

                   
                  {Config.deviceInfo.isMobile === true ?  
                  <li className="mobile-search">               
                    <a onClick={() => this.setState({ open: !this.state.open })}>
                      <span className="icon-moon icon-search dark"></span>
                    </a>
                    <Collapse in={this.state.open}>
                      <div>
                       {this.props.auth.isAuthenticated && this.props.socket && this.state.userName ? (            
                        <ApplicationSearch />) : null}
                      </div>
                    </Collapse>                  
                    </li> : null}
                  
                  
                  <li>
                    {this.props.auth ?
                    <a href="javascript:void(0)" title="Send feedback" onClick={this.handleFeedbackModal}>
                      <span className="icon-moon icon-feedback dark"></span>
                    </a> : null}
                  </li>
                  <li>
                      { this.state.showFeedbackModal ? <FeedbackModal handleFeedbackModal={this.handleFeedbackModal}  /> : null}
                      <Notifications socket={this.props.socket} />
                  </li>
                </ul>
              </div>
          ) : null}
          </div>
          {Config.deviceInfo.isMobile === true ? 
            <DetailsNav/> : null}
        </div>
      </div> 
    );
  }
}

function mapStateToProps({ auth, nav, profile }) {
  return {
    auth: auth.authentication,
    isAuthenticated: auth.isAuthenticated,
    authenticated: nav.isAuthenticated,
    profile: profile.profile
  };
}

export default connect(
  mapStateToProps,
  {
    logout: authActions.logout,
    updateUser: profileActions.updateUser,
    togglePageView: profileActions.togglePageView
  }
)(withRouter(NavMenu));
