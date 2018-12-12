import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchList } from "../../../actions/students/actions";
import './StudentList.css';

import defaultLogo from '../../../../assets/logo.png';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            listCount: 10
        }
    }

    componentDidMount() {
        this.props.fetchList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.List && nextProps.List.length) {
            this.setState({
                students: nextProps.List.students
            });
        }
    }
    
    render() {
        return (
            <div className="workspace-list">
                <ul className="item-container">
                    {this.state.students.map((student, i) => {
                        return (
                            <li key={i}>
                                <div
                                    className={
                                        student.active
                                            ? 'selected-li collaborator-item'
                                            : 'collaborator-item'
                                    }
                                    onClick={() => this.highlightUser(student)}
                                >
                                    <figure>
                                        <img
                                            className="img-collab"
                                            src={student.img ? student.img : logoImage}
                                            title={student.username}
                                            alt=""
                                        />
                                    </figure>
                                    <div className="audio">
                                        <div>{student.grades}</div>
                                    </div>
                                    <div className="audio">
                                        <div>{student.address}</div>
                                    </div>
                                    <div className="audio">
                                        <div>{student.city}</div>
                                    </div>
                                    <div className="audio">
                                        <div>{student.state}</div>
                                    </div>
                                    <div className="audio">
                                        <div>{student.hobbies}</div>
                                    </div>
                                </div>
                            </li>
                        );
                    }
                    )}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ profile, projects, collaborators }) {
    return {
        profile: profile.profile,
        projects,
        audios: projects.audios,
        currentProject: projects.currentProject,
        recentProjects: projects.recentProjects,
        totalCollabs: collaborators.collaborators.length
    };
}

export default connect(mapStateToProps, {
    fetchCurrentProject,
    editCurrentProject
})(withRouter(Workspace));