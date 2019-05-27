import React, { Component } from 'react';
// Tools
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logoFooter from '../../../assets/logo-footer.png';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Auth, API } from 'aws-amplify';
import LoaderButton from '../Utility/ButtonWithLoader/LoaderButton';
import { checkExternalInvites } from '../../actions/profile/actions'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: this.props.email || '',
      password: '',
      confirmPassword: '',
      termsAcceptFlag: false,
      errors: {},
      isLoading: false,
      passwordVisibility: { 'password': false, 'confirmPassword': false }
    };
    this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username) {
      this.setState({ username: nextProps.username });
    }
  }

  handleChange = event => {
    if (event.target.type === 'checkbox') {
      this.setState({ termsAcceptFlag: !this.state.termsAcceptFlag }, function () {
        this.validateForm();
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.validateForm()) {
      try {
        // check if email address is already in user or not
        let userExists = await API.post('TheLabz', '/api/user/checkIfUserExists', {
          body: { email: this.state.email },
        });
        console.log('userExists', userExists)
        if (!userExists) {
          this.setState({ isLoading: true });
          // let result = await Auth.signUp({
          //   username: this.state.username,
          //   password: this.state.password,
          //   attributes: {
          //     email: this.state.email,
          //   },
          // });
          await Auth.signUp({
            username: this.state.username,
            password: this.state.password,
            attributes: {
              email: this.state.email,
            },
          });
          this.setState({ isLoading: false });
          this.props.history.push({
            pathname: '/login',
            state: { username: this.state.username, projectId: this.props.projectId },
          });
        } else {
          let errors = this.state.errors;
          errors.email = 'Email address already in use.';
          this.setState({ isLoading: false, errors });
        }
      } catch (e) {
        console.log(e);
        let errors = this.state.errors
        if (e.code === 'UsernameExistsException') {
          errors.username = 'Username already exists';
        } else {
          alert(e.message);
        }
        this.setState({ isLoading: false, errors });
      }
    }
  };

  createUser(user) {
    return API.post('TheLabz', '/api/user', {
      body: user,
    });
  }

  validateForm() {
    let formIsValid = true;
    let errors = {};
    if (!this.state.username.length) {
      formIsValid = false;
      errors['username'] = `Username can't be empty`;
    } else {
      if (!this.state.username.match("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$")) {
        formIsValid = false;
        errors['username'] = `Username only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.`;
      }
    }

    if (!this.state.email.length) {
      formIsValid = false;
      errors['email'] = `Email can't be empty`;
    } else {
      let lastAtPos = this.state.email.lastIndexOf('@');
      let lastDotPos = this.state.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = `Password can't be empty`;
    }
    if (!this.state.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = `Password can't be empty`;
    }
    if (this.state.password.length && this.state.confirmPassword.length) {
      if (this.state.password !== this.state.confirmPassword) {
        formIsValid = false;
        errors['confirmPassword'] = `Password does not match`;
      } else {
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;
        if (!this.state.password.match(regex)) {
          formIsValid = false;
          errors['password'] = `Password must have a number, a special character, an uppercase and a lower case character. (Min length 6).`;
        }
      }
    }
    if (!this.state.termsAcceptFlag) {
      formIsValid = false;
      errors['terms'] = `You must agree to the terms and conditions before registering!`;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handlePasswordVisibility(type) {
    let passwordVisibility = this.state.passwordVisibility;
    passwordVisibility[type] = !passwordVisibility[type]
    this.setState({ passwordVisibility });
  }

  render() {
    return (
      <section className="create-account" id="registration">
        <div className="container-fluid">
          <form className="form" onSubmit={this.handleSubmit}>
            <h2 className="title">
              Create A Free Account
            </h2>
            <div className="clearfix" />
            <FormGroup controlId="username">
              <FormControl
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
            </FormGroup>
            <FormGroup controlId="email">
              <FormControl
                type="text"
                placeholder="Email Address"
                value={this.state.email}
                autoComplete="on"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                type={(!this.state.passwordVisibility['password']) ? 'password' : 'text'}
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormControl.Feedback className="input-right-icon" onClick={e => this.handlePasswordVisibility('password')}>
                <span><i className="fa fa-eye" aria-hidden="true"></i></span>
              </FormControl.Feedback>
              <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
            </FormGroup>
            <FormGroup controlId="confirmPassword">
              <FormControl
                type={(!this.state.passwordVisibility['confirmPassword']) ? 'password' : 'text'}
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <FormControl.Feedback className="input-right-icon" onClick={e => this.handlePasswordVisibility('confirmPassword')}>
                <span><i className="fa fa-eye" aria-hidden="true"></i></span>
              </FormControl.Feedback>
              <span style={{ color: "red" }}>{this.state.errors["confirmPassword"]}</span>
            </FormGroup>
            <div className="form-group">
              <label className="fancy-checkbox font-size-14">
                <input name="" type="checkbox" id="" checked={this.state.termsAcceptFlag} onChange={this.handleChange} />
                <span>
                  <i />I agree to the LABZ Terms
                </span>
              </label>
              <span style={{ color: "red" }}>{this.state.errors["terms"]}</span>
            </div>
            {this.state.showTermsError ? <span>Error</span> : null}
            {/* {<div className="form-group">
              <input
                type="submit"
                name=""
                value="Create an account"
                className="btn btn-create mt20"
              />
            </div>} */}
            <div className="form-group">
              <LoaderButton
                className="btn btn-create mt20"
                block
                bsSize="large"
                type="submit"
                isLoading={this.state.isLoading}
                text="Create an account"
                loadingText="Creating your account…"
              />
            </div>
            {/*
              <div className="connect-with-social">
                <p className="font-size-18 font-weight-600 text-center lbl">
                  Or connect with
                </p>
                <ul className="social-icon-ul">
                  <li>
                    <a href="https://facebook.com" className="btn btn-fb">
                      <span className="icon icon-fb"></span>
                      <span>Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a href="http://google.com" className="btn btn-google">
                      <span className="icon icon-google"></span>
                      <span>Google</span>
                    </a>
                  </li>
                </ul>
              </div>
            */}
            <figure className="logo">
              <img src={logoFooter} className="img-responsive" alt="Logo" />
            </figure>
            <p className="font-size-36 text-center safest-lbl">
              The safest way to create
            </p>
            <ul className="social-share-ul">
              <SocialShareIcon link={"http://facebook.com"} iconClass={"fa fa-facebook-official"} />
              <SocialShareIcon link={"http://twitter.com"} iconClass={"fa fa-twitter"} />
              <SocialShareIcon link={"http://instagram.com"} iconClass={"fa fa-instagram"} />
              <SocialShareIcon link={"http://youtube.com"} iconClass={"fa fa-youtube-play"} />
            </ul>
          </form>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { checkExternalInvites }
)(withRouter(CreateAccount));


class SocialShareIcon extends Component {
  render() {
    return (
      <li>
        <a href={this.props.link}>
          <i className={this.props.iconClass} aria-hidden="true" />
        </a>
      </li>
    )
  }
}
