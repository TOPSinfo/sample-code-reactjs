import React from "react";
import ProjectItem from "./ProjectItem";
import { connect } from "react-redux";
import "./ProjectList.css";

const ProjectList = ({ profile, projects, data }) => (
  <ul className="projectList">
    {data &&
      data.map((p, i) => {
        return <ProjectItem key={i} project={p} />;
      })}
  </ul>
);

function mapStateToProps({ profile, projects }) {
  return { profile, projects };
}
export default connect(mapStateToProps)(ProjectList);
