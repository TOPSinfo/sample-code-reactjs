import React, { Component } from "react";
import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";
// Tools
import { connect } from 'react-redux';
import '../../../../../node_modules/cropperjs/dist/cropper.css';
// Components
import { createProject } from '../../../actions/projects/actions';
import logo from '../../../../assets/logo.png';
import Loader from '../../Projects/Loader/Loader';
import Joyride from "react-joyride";
import { ACTIONS, EVENTS } from "react-joyride/lib/constants";
import PropTypes from "prop-types";
import SkipModal from "../../Projects/SkipModal";
import { validateImageFile } from '../../helper';
import ImageCropper from '../../Utility/ImageCropper';
import steps from '../Steps'

class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      skipModal: false,
      showTour: false,
      showImageCropper: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.projectExists && nextProps.projects.projectExists === true) {
      this.setState({ ...this.state, projectExistsError: true, showLoader: false });
    }
  }

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  componentWillMount() {
    if (this.props.showTour === 1) {
      this.setState({
        showTour: true,
        run: true,
        stepIndex: 0,
        continuous: true,
        steps:steps.step2
      });
    }
  }

  selectImage = e => {
    const target = e.currentTarget;
    let { valid, errString } = validateImageFile(target);
    if (valid) {
      const file = target.files[0];
      let src = URL.createObjectURL(file);
      this.setState({
        tempProjectLogo: src,
        tempLogoObject: file,
        showImageCropper: true
      });
    } else {
      this.setState({
        showImageCropper: true,
        imageValidationError: true,
        imageValidationMessage: errString
      });
    }
  };

  handleCropperModal() {
    this.setState({ showImageCropper: !this.state.showImageCropper }, function () {
      if (!this.state.showImageCropper) {
        delete this.state.imageValidationError;
        delete this.state.imageValidationMessage;
      }
    });
  }

  updateProjectImg = (imagesrc, imageFile) => {
    this.setState({ projectLogo: imagesrc, logoObject: imageFile, imgDataLoaded: true });
  }

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { action, index, type } = data;
    let stepIndex = this.state.stepIndex;


    if (type === EVENTS.STEP_AFTER) {
      if (stepIndex === 0) {
        // this.state.formattedProjectName = `${this.props.profile.username}_first_tour`
        this.setState({formattedProjectName : `${this.props.profile.username}_first_tour`})
        this.addNewProject();
      }
      else {
        stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      }
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
          this.props.handleModal(true);
        }
      }
    }
  };

  handleNameChange = e => {
    let format = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/;
    let projectName = e.target.value;
    projectName = projectName.slice(0, 50);
    this.setState({
      projectName,
      displayMsg: format.test(projectName) || projectName.indexOf(' ') >= 0,
      formattedProjectName: projectName
        .replace(/[^\w\s]/gi, '-')
        .split(' ')
        .join('-'),
    });
  };

  handlFormSubmit = e => {
    e.preventDefault();
    this.addNewProject();
  }

  addNewProject = () => {
    this.setState({ ...this.state, showLoader: true});
    let project = {
      logo: this.state.logoObject ? this.state.logoObject : 'logo.png',
      name:
        this.state.formattedProjectName && this.state.formattedProjectName.length
          ? this.state.formattedProjectName
          : 'New_project_' + (this.props.projects.myProjects.length + 1),
      userId: this.props.profile.id,
      username: this.props.profile.username
    };
    this.props.createProject(project);
  };

  render() {
    const joyrideProps = {
      ...this.state,
      ...this.props.joyride
    };

    return (
      <div>
        <Joyride
          ref="joyride"
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
        />
        {(this.state.skipModal === true) ? <SkipModal /> : null}
        <Modal
          bsSize="sm"
          show={true}
          onHide={this.props.handleModal}
          className="modal_size add-project-modal"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            {!this.state.showLoader ? (
              <div className="add-project-container">
                {!this.state.showImageCropper ? (
                  <React.Fragment>
                    <div className="project-image">
                      <input
                        id="selectFile"
                        type="file"
                        onChange={this.selectImage}
                        className="fileInput"
                        accept="image/*"
                      />
                      <div>
                        <label
                          htmlFor="selectFile"
                          className="glyphicon glyphicon-edit select-file aaaanewwww"
                        />
                        <img className="image_src"
                          src={(this.state.projectLogo) ? this.state.projectLogo : logo}
                          alt="logo img"
                        />
                      </div>
                    </div>
                    <div className="project-detail">
                      <form onSubmit={this.handlFormSubmit}>
                        <FormGroup controlId="fileUploadForm">
                          {
                            <FormControl
                              type="text"
                              placeholder="Project Name"
                              className="projectName"
                              maxLength="50"
                              value={
                                this.state.projectName
                                  ? this.state.projectName
                                  : ''
                              }
                              onChange={e => {
                                this.handleNameChange(e);
                              }}
                            />
                          }
                          {this.state.displayMsg ? (
                            <label className="project-warning">
                              Project name will become {this.state.formattedProjectName}
                            </label>
                          ) : null}
                        </FormGroup>
                      </form>
                      <div className="specialClass"></div>
                      {this.state.projectExistsError ? (
                        <span className="err">
                          Project name already exists.
                        </span>
                      ) : null}
                    </div>
                  </React.Fragment>
                ) : (
                    <div className="cropper">
                      <ImageCropper
                        imageSrc={this.state.tempProjectLogo}
                        imageFile={this.state.tempLogoObject}
                        validationError={this.state.imageValidationError}
                        validationMsg={this.state.imageValidationMessage}
                        addImage={this.updateProjectImg}
                        handleModal={this.handleCropperModal.bind(this)}
                        dataLoaded={this.state.imgDataLoaded}
                      />
                    </div>
                  )}
              </div>
            )
              : (
                <div className="add-project-container">
                  <Loader />
                </div>
              )}
          </Modal.Body>
          <Modal.Footer>
            {!this.state.showLoader ? (
              <div>
                <Button
                  className="btn-success submitButton"
                  onClick={() => this.addNewProject()}
                > Done </Button>
                <Button onClick={() => this.props.handleModal()}> Close </Button>
              </div>
            ) : null}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ profile, projects }) {
  return {
    profile: profile.profile,
    projects,
  };
}

export default connect(
  mapStateToProps,
  {
    createProject,
  }
)(AddProjectModal);
