import React from "react";
// Tools
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import { withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import Moment from 'react-moment';
// Components
import { Link } from "react-router-dom";
import defaultLogo from '../../../../../assets/logo.png';

// add on click to take you to project workspace

const ProjectItem = ({ project, toggleActiveTab, history }) => {
  return (
    <li className="item" >
      <div className="item">
        <Link to={{ pathname: `/project/${project.projectName}`, query: { projectId: project.id } }} className="item">
          <img className="img-responsive project-list-item" src={(project.logo === 'logo.png') ? defaultLogo : project.logo} alt='' />
        </Link>
        <div>
          {/* <p className="date"><Moment format="DD/MM/YYYY" date={project.createdAt} /></p> */}
          <p className="date"><Moment format="MM/DD/YYYY" date={project.createdAt} /></p>
          <div className="name-noification">
            <div className="name" title={project.projectName}>{project.projectName}</div>
            <div className="project-icon">
              <FontAwesome
                className="icons"
                name=' fa-bell'
              />
              <span className="collab-count">{project.unreadChatCount}</span>
            </div>
            <div className="project-icon">
              <div className="fa fa-user text">
                <span className="collab-count">{project.collaborators.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default connect(null, {
  toggleActiveTab: actions.navActions.toggleActiveTab
})(withRouter(ProjectItem));
