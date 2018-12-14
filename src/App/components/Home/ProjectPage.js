import React, { Component } from 'react';
import projectpage from "../../../assets/projectpage.png"

class ProjectPage extends Component {

  render() {
    return (
       <section className="project-page">
          <div className="container">
            <h2 className="shadow-title" data-label="Collaborate and complete songs" data-label2=" all in one place.">Collaborate and complete songs <br/>all in one place.</h2>     
            <div className="row mt30">
              <div className="col-md-7">
                <figure>
                  <img src={projectpage} className="img-responsive" alt="Project" />
                </figure>
              </div>
              <div className="col-md-5">
                <p className="font-size-26 font-weight-500">An easier way to manage your creative works.</p>
                <ul className="creative-work-ul">
                  <li className="bullet-yellow">Lyrics</li>
                  <li className="bullet-blue">Audio Uploading/Downloading</li>
                  <li className="bullet-green">Messaging</li>
                  <li className="bullet-blue">Split Ownership Automation</li>
                  <li className="bullet-brown">Tracking</li>
                  <li className="bullet-yellow">Approval</li>
                  <li className="bullet-green">Registration</li>
                </ul>
              </div>
            </div>  
          </div>
        </section>
    );
  }
}


export default ProjectPage;
