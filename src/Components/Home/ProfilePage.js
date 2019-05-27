import React, { Component } from 'react';
import profileimage from "../../assets/logo.svg"

class ProfilePage extends Component {
  render() {
    return (
      <section className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure>
                  <img src={profileimage} className="img-responsive" alt=""/>
                </figure>
              </div>
              <div className="col-md-4">
                <div className="content">
                  <h4 className="title">Collaboration</h4>
                  <p>Add a new project, upload audio and invite other producers or songwriters to collaborate with you on the creative process.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content">
                  <h4 className="title">Rights Management</h4>
                  <p>Each creator’s contribution is automated to determine splits and ownership making the copyright registration and publishing documentation seamless.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content">
                  <h4 className="title">Asset Protection</h4>
                  <p>After the song is completed, each contributor approves their share and the song is stored securely on a blockchain backed URL for private or public sharing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}


export default ProfilePage;