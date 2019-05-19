import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import LoaderButton from '../Utility/ButtonWithLoader/LoaderButton';
// import { withRouter } from 'react-router-dom';
import './Login.css';
import logobig from '../../assets/logo.svg';

class Login extends Component {
  state = {
    isLoading: false,
    username: '',
    password: '',
    errors: {}
  };


  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };



  // getUser = async username => {
  //   await this.props.addAuth(username);
  //   await this.props.fetchProfile(username);
  //   this.props.userHasAuthenticated(true);
  //   history.push('/'+username);
  // };

  validateLoginForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!this.state.username.length) {
      formIsValid = false;
      errors['username'] = `Username can't be empty`;
    }else {
      if (!this.state.username.match("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$")) {
        formIsValid = false;
        errors['username'] = `Invalid Username.`;
      }
    }
    if (!this.state.password.length) {
      formIsValid = false;
      errors['password'] = `Password can't be empty`;
    }
    this.setState({ errors: errors })
    return formIsValid;
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.validateLoginForm()) {
      this.setState({ isLoading: true});
      try {
        // await this.props.auth.login(
        //   this.state.username,
        //   this.state.password
        // );

        // let username = this.props.auth.getUserName();
        // await this.getUser(username);
        // if(username){
        //   this.setState({ isLoading: false ,errorTxtMsgUserNotExists: "", errorTxtMsgPasswordNotExists:""});
        // }
      } catch (e) {
        if (e.code === "UserNotFoundException") {
          let errors = this.state.errors;
          errors.username = 'Username not found.';
          this.setState({ isLoading: false, errors });
        }
        if (e.code === "NotAuthorizedException") {
          let errors = this.state.errors;
          errors.password = 'Invalid password.';
          this.setState({ isLoading: false, errors });
        }
      }
    }
  };

  render() {
    return (
      <div className="login-page">
          <div className="login-container">
              <div className="logo">
                  <img src={logobig} />
              </div>
              <div className="login-signup-form">
                  <div className="tab-option">
                      <a href="javascript:void(0)" className="active">SIGN IN</a>
                  </div>
                  <div className="tab-content">
                      <div className="form-container">
                        <form className="form" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                              <label className="custom-lbl">Username</label>
                              <input 
                                type="text" 
                                id="username"
                                className="form-control"
                                placeholder="Enter your username" 
                                value={this.state.username}
                                onChange={this.handleChange}/>
                              <span style={{ color: "red" }}>{this.state.errors['username']}</span>
                          </div>
                          <div className="form-group">
                              <label className="custom-lbl">Password</label>
                              <input 
                                type="password" 
                                id="password"
                                className="form-control" 
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                              <span style={{ color: "red" }}>{this.state.errors['password']}</span>
                          </div>
                          
                          <div className="button-container">
                              {/* <LoaderButton
                                block
                                bsSize="large"
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Login"
                                className="btn btn-theme width-200"
                                loadingText="Logging in"
                                /> */}
                          </div>
                        </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>     
    );
  }
}

// function mapStateToProps({ auth }) {
//   return { auth: auth.authentication };
// }

export default Login;
// export default connect('', '')(withRouter(Login));
