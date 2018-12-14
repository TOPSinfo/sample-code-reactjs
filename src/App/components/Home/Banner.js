import React, { Component } from 'react';
import './Home.css';
import go from '../../../assets/go.png';
import audioIcon from '../../../assets/audioIcon.png';
import videoIcon from '../../../assets/vedioIcon.png';
import noteIcon from '../../../assets/noteIcon.png';
import bannerimage from '../../../assets/bannerimage.png';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
    // Using updateUsername bcz login works with username
    this.props.updateUsername(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.checkUserExists();
  }

  render() {
    return (
      <section className="banner" id="home-banner">
        <div className="container">
          <h2 className="banner-title">
            Finally, a safer way to create and collaborate.{' '}
          </h2>
          <div className="row">
            <div className="col-md-6">
              <p className="line-height-custom">
                Collaborative music workspace that provides automated tracking,
                rights management and protection of your digital assets during
                and after you create. Store and share securely with The LABZ.
              </p>
              <ul className="category-ul">
                <li>
                  <div className="category-container">
                    <figure>
                      <img
                        src={audioIcon}
                        className="img-responsive"
                        alt="audio"
                      />
                    </figure>
                  </div>
                </li>
                <li>
                  <div className="category-container">
                    <figure>
                      <img
                        src={videoIcon}
                        className="img-responsive"
                        alt="audio"
                      />
                    </figure>
                    <span className="comming-soon" />
                  </div>
                </li>
                <li>
                  <div className="category-container">
                    <figure>
                      <img
                        src={noteIcon}
                        className="img-responsive"
                        alt="audio"
                      />
                    </figure>
                    <span className="comming-soon" />
                  </div>
                </li>
              </ul>

              <div className="collaborating-form" >
                <p className="text-center font-size-18">
                  Start collaborating now for FREE. Upgrade as you grow.
                </p>
                <Form onSubmit={this.handleSubmit} >
                  <FormGroup className="input-btn-grp" controlId="userName"  >
                    <FormControl
                      type="text"
                      name=""
                      className="form-control text-email"
                      placeholder="Enter your email address"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                    <div className="btn-go">
                      <img src={go} alt="" onClick={this.props.checkUserExists} />
                    </div>
                  </FormGroup>
                </Form>
                <p className="text-center font-size-18">
                  Already using The Labz? <a href="/login">Sign in</a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <p className="text-center font-size-20">
                FREE BETA Powered by Blockchain Technology
              </p>
              <figure>
                <img
                  src={bannerimage}
                  className="img-responsive"
                  alt="banner"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Banner;