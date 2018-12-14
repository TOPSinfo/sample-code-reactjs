import React, { Component } from 'react';

class WorkflowPage extends Component {
  render() {
    return (
       <section className="how-work"> 
          <div className="container">
            <div className="row">
              <div className="col-md-5 align-self-center">
                <h2 className="shadow-title" data-label="See how The LABZ" data-label2="works for you.">See how The LABZ <br/>works for you.</h2>    
              </div>
              <div className="col-md-7">
                <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/CFOQhVAMeT8" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}


export default WorkflowPage;