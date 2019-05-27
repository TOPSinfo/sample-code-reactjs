import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Label,
  Modal
} from 'react-bootstrap';
// Tools
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
// Components
import { fetchProjects } from '../../../actions/projects/actions';
import ProjectList from './components/ProjectList';
// import history from '../../../history';
import './Project.css';
import AddProjectModal from './AddProjectModal';
import Joyride from "react-joyride";
import { ACTIONS, EVENTS } from "react-joyride/lib/constants";
import PropTypes from "prop-types";
import SkipModal from "../../Projects/SkipModal";
import { updateUser } from '../../../actions/profile/actions';
import steps from '../Steps'


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      allProjects: [],
      sort: {
        type: 1,
        order: 1,
      }, // type 0 for Name 1 for date, order 0 for ASC and 1 for DESC
      showTutorial: true,
      showTour: false
    };

    this.sortProjects = this.sortProjects.bind(this);
  }

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  closeModal = () => {
    let userDetail = {
      userId: this.props.profile.id,
      showTour: 0,
      username: this.props.profile.username,
    }
    this.props.updateUser(userDetail);
    this.setState({
      showTutorial: false
    });
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { action, index, type } = data;
    let stepIndex = this.state.stepIndex;

    if (stepIndex === 0) {
      this.setState({
        showTutorial: false
      })
    }

    if (type === EVENTS.STEP_AFTER) {
      if (stepIndex === 0) {
        this.setState({
          showModal: true
        })
      }
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      stepIndex = index + 1;
    } else if (type === EVENTS.TARGET_NOT_FOUND) {
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    }

    this.setState({ stepIndex });

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      if (type === EVENTS.TOUR_END) {
        if (this.state.steps.length !== stepIndex) {
          this.setState({
            skipModal: true
          })
        }
      }
    }
  };

  componentDidMount() {
    let username = this.props.auth.getUserName();
    if (this.props.projects.myProjects.length && !this.state.allProjects.length) {
      this.setState({ allProjects: this.props.projects.myProjects });
    }
    // this.props.fetchProjects(username, '');
    if (this.props.socket) {
      this.props.socket.on('projectListUpdate', data => {
        if (this.props.pageView === 'projects') {
          this.props.fetchProjects(username, '');
        }
      });
    }
  }

  /*NOTE: Using componentDidUpdate method for storing data into state
    otherwise render gets called before data being stored into state */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let sortOrder = this.state.sort.order === 0 ? 'asc' : 'desc';
      let sortType = this.state.sort.type === 0 ? 'projectName' : 'createdAt';
      let projectsData = orderBy(this.props.projects.myProjects, sortType, sortOrder);

      this.setState({
        allProjects: projectsData,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({
        showTour: nextProps.profile.showTour,
        showTutorial: true
      })
    }
  }

  handlFormSubmit(e) {
    e.preventDefault();
  }

  handleAddProjectModal = (skipModal) => {
    this.setState({
      showModal: !this.state.showModal,
    });
    if (skipModal === true) {
      this.setState({
        skipModal: true
      })
    }
  };

  handleSearch = e => {
    let searchValue = e.target.value;
    if (searchValue.length > 2) {
      this.props.fetchProjects(this.props.profile.username, searchValue);
    } else {
      this.props.fetchProjects(this.props.profile.username, '');
    }
  };

  sortProjects(type) {
    let newSortParams = { ...this.state.sort };
    // Change sort order if type is same else only change type
    if (this.state.sort.type === type) {
      newSortParams.order = this.state.sort.order === 0 ? 1 : 0;
    } else {
      newSortParams.type = this.state.sort.type === 0 ? 1 : 0;
    }
    let sortType = newSortParams.type === 0 ? 'projectName' : 'createdAt';
    let sortOrder = newSortParams.order === 0 ? 'asc' : 'desc';
    let sortedProjects = orderBy(this.state.allProjects, sortType, sortOrder);
    this.setState({
      sort: newSortParams,
      allProjects: sortedProjects,
    });
  }

  getSortClass(type) {
    let spanClass = 'fa fa-sort';
    if (this.state.sort.type === type && this.state.sort.order === 0) {
      spanClass += ' fa-sort-up';
    } else if (this.state.sort.type === type && this.state.sort.order === 1) {
      spanClass += ' fa-sort-down';
    }
    // This return will send default class ie fa fa-sort
    return spanClass;
  }

  start = () => {
    this.setState({
      showTour: true,
      run: true,
      stepIndex: 0,
      continuous: true,
      steps: steps.step1
    });
  };

  render() {
    const joyrideProps = {
      ...this.state,
      ...this.props.joyride
    };
    return (
      <div className="projects">
        <div className="projectHeader">
          <div>
            <Form inline onSubmit={this.handlFormSubmit}>
              <FormGroup>
                <Button
                  className="add-button btn-addproject"
                  onClick={() => this.handleAddProjectModal()}
                >
                  <div className="fa fa-plus text" /> Project{' '}
                </Button>{' '}
                <FormControl
                  type="text"
                  placeholder="Search Keywords"
                  className="searchhhh"
                  onChange={e => {
                    this.handleSearch(e);
                  }}
                />
                <p className="filter-p" onClick={() => this.sortProjects(0)} title="Sort By Name">
                  <ControlLabel>Name</ControlLabel>
                  <span className={this.getSortClass(0)} />
                </p>
                <p className="filter-p" onClick={() => this.sortProjects(1)} title="Sort By Date">
                  <ControlLabel>Date</ControlLabel>
                  <span className={this.getSortClass(1)} />
                </p>
              </FormGroup>
            </Form>

            {this.state.showModal ? (
              <AddProjectModal showTour={this.props.profile.showTour} handleModal={this.handleAddProjectModal} />
            ) : null}
          </div>
        </div>
        {/* On changing tabs, state gets refreshed so fetch data from redux  */}
        {this.state.allProjects.length ?
          <ProjectList
            data={this.state.allProjects}
          /> : null}
        {this.state.showTour === true ? <Joyride
          ref="joyride"
          scrollToFirstStep
          showSkipButton
          run={this.state.run}
          autostart={true}
          {...joyrideProps}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              arrowColor: "#e3ffeb",
              backgroundColor: "#e3ffeb",
              primaryColor: "#000",
              textColor: "#004a14",
              overlayColor: "rgba(0, 0, 0, 0.4)"
            }
          }}
        /> : null}

        {(this.state.showTour === 1) ?
          <Modal className="tour_modal" bsSize="small" show={this.state.showTutorial} onHide={this.closeModal}>
            <Modal.Body>
              <img src="https://i.pinimg.com/originals/fe/2c/64/fe2c646744bf4b17d310aed8240aedb3.png" width="100" alt="" />
              <h3 className="title">Welcome to The Labz</h3>
              <p className="subtitle">The musician's secure home</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.start} bsStyle="success"> Let's take a tour! </Button>
              <Label className="skiptour" onClick={this.closeModal}>Skip the tour for now </Label>

            </Modal.Footer>
          </Modal> : null
        }

        {this.state.skipModal ? <SkipModal /> : null}
      </div>
    );
  }
}

function mapStateToProps({ auth, profile, projects }) {
  return {
    auth: auth.authentication,
    profile: profile.profile,
    pageView: profile.pageView,
    projects,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchProjects,
    updateUser
  }
)(withRouter(Projects));
