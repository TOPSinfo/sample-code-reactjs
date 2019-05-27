import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Home.css';

import Banner from './Banner';
import ProjectPage from './ProjectPage';
import ProfilePage from './ProfilePage.js';
import WorkflowPage from './WorkflowPage.js';
import CreateAccount from './CreateAccount.js';
import Header from './Header.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: ''
    };
    this.updateEmail = this.updateEmail.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleHeaderClass);
  }

  async componentDidMount() {
    if (this.props.auth.authentication.isAuthenticated()) {
      let user = await this.props.auth.authentication.getCurrentUser();
      this.props.history.push('/'+user.username);
    }
  }

  goToRegistration = () => {
    this.props.history.push('/register');
  };

  updateEmail = email => {
    this.setState({ email });
  };

  updateUsername = username => {
    this.setState({ username });
  };

  handleHeaderClass = () => {
    let banner = document.getElementById('home-banner');
    let header = document.getElementById('home-header');

    // On scroll, as soon as banner reaches top, add new class to header
    let headerCrossed = (window.scrollY > banner.offsetTop ? true : false)

    if (headerCrossed) {
      if (!header.classList.contains('stuck-header')) {
        header.classList.add('stuck-header');
      }
    } else {
      if (header.classList.contains('stuck-header')) {
        header.classList.remove('stuck-header');
      }
    }
  }

  checkUserExists = async () => {
    try {
      await this.props.auth.authentication.login(this.state.username, '123');
    } catch (e) {
      // If the error is UserNotFoundException, it means user does not exist at all so 
      // scrolling user to registration section
      if (e.code === "UserNotFoundException") {
        let registrationElement = document.getElementById('registration');
        window.scrollTo({
          top: registrationElement.offsetTop,
          behavior: 'smooth'
        });
      } else if (e.code === "NotAuthorizedException") {
        this.props.history.push({
          pathname: '/login',
          state: { username: this.state.username }
        });
      }
    }
  }

  goTologin = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="home">
        <Header goTologin={this.goTologin} />
        <Banner updateUsername={this.updateUsername} checkUserExists={this.checkUserExists} />
        <ProjectPage />
        <WorkflowPage />
        <ProfilePage />
        <CreateAccount username={this.state.username} projectId={this.state.projectId}/>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log('auth value is', auth)
  return { auth };
}

export default connect(
  mapStateToProps,
  {
    checkAuthentication: actions.authActions.checkAuthentication,
    getProfile: actions.authActions.getProfile,
    fetchProfile: actions.profileActions.fetchProfile,
  }
)(withRouter(Home));
