import React, { Component } from 'react';
import './Notifications.css';
import { connect } from 'react-redux';
import { usersActions } from '../../actions';
import { Button } from 'react-bootstrap';
import history from '../../history';

class Notifications extends Component {
  constructor(props){
    super(props);
    this.state= {
      classColor : false
    }

    if(props.totalInvites > 0){
      this.setState({classColor : true})
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.totalInvites > 0){
      this.setState({classColor : true})
    }
  }
  componentDidMount() {
    let username = this.props.auth.getUserName();
    this.props.getInvites(username);
    if (this.props.socket) {
      this.props.socket.on('invitationRequestReceived', data => {
        this.props.getInvites(username);
      });
    }
  }

  onClick = e => {
    let username = this.props.auth.getUserName();
    history.push(`/${username}/pending_invites`);
  };

  render() {
    var className = 'icon-moon icon-notification dark';
    className += this.state.classColor ? ' fill': ' ';
    return (
      <a href="javascript:void(0);" className="notification-count" onClick={this.onClick}>
      <span className={className} title={
          this.props.incoming
            ? `You have ${this.props.totalInvites} invites for Projects`
            : ''
        }> </span>
      {this.props.totalInvites > 0 ? (
          <span className="count" >{this.props.totalInvites}</span>
        ) : (
          ''
        )}
      </a>
    );
  }
}

function mapStateToProps({ auth, users, profile }) {
  return {
    auth: auth.authentication,
    profileId: profile.profile.id,
    incoming: users.invites && users.invites.length > 0,
    totalInvites: users.invites.length,
  };
}

export default connect(
  mapStateToProps,
  {
    getInvites: usersActions.getInvites,
  }
)(Notifications);
