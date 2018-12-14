import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { profileActions } from '../../../actions'
import { FormGroup, Form, Button, ControlLabel, FormControl } from 'react-bootstrap';
import '../../../../../node_modules/cropperjs/dist/cropper.css';
import logo from '../../../../assets/logo.png';
import ImageCropper from '../../Utility/ImageCropper';
import ReactTags from 'react-tag-autocomplete';
import { validateImageFile } from '../../helper';
import Loader from '../../Projects/Loader/Loader';

class Profile extends Component {
    constructor(props) {
        super(props);
        let userSkills = [];
        if (this.props.profile.skills && this.props.profile.skills.length) {
            userSkills = this.getUserSkillsTags(this.props.profile.skills);
        }

        this.state = {
            userInfo: (this.props.profile.info) ? this.props.profile.info : '',
            userSkillTags: userSkills,
            userAlias: (this.props.profile.alias) ? this.props.profile.alias : '',
            userImage: (this.props.profile.img) ? this.props.profile.img : logo,
            showCropperModal: false,
            profileLastUpdatedAt: this.props.profile.updatedAt,
            formDataChange: false
        };
        this.handleSkillAddition = this.handleSkillAddition.bind(this);
        this.handleSkillDeletion = this.handleSkillDeletion.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.updatedAt !== this.state.profileLastUpdatedAt) {
            this.setState({showLoader: false, formDataChange : false});
        }
    }

    getUserSkillsTags(skills) {
        return skills.map((skill) => { return { 'name': skill } });
    }

    resetFormValues() {
        this.setState({
            userInfo: (this.props.profile.info) ? this.props.profile.info : '',
            userSkillTags: (this.props.profile.skills && this.props.profile.skills.length) ? this.getUserSkillsTags(this.props.profile.skills) : [],
            userAlias: (this.props.profile.alias) ? this.props.profile.alias : '',
            userImage: (this.props.profile.img) ? this.props.profile.img : logo,
            showCropperModal: false,
            formDataChange: false
        });
        delete this.state.imageValidationError;
        delete this.state.imageValidationMessage;
    }
    selectNewUserImg = e => {
        const target = e.currentTarget;
        let {valid, errString} = validateImageFile(target);
        if (valid) {
            const file = target.files[0];
            let src = URL.createObjectURL(file);
            this.setState({
                tempUserImgSrc: src,
                tempUserImgFile: file,
                formDataChange: true
            });
            this.setState({ showCropperModal: true });
        } else {
            this.setState({ showCropperModal: true, imageValidationError: true, imageValidationMessage: errString });
        }
    }

    handleProfileFormSubmit = event => {
        event.preventDefault();
        this.setState({
            showLoader: true
        }, function(){
            let userSkills = this.state.userSkillTags.map(skill => skill.name);
            let userData = {
                profileUpdate: true,
                userId: this.props.profile.id,
                username: this.props.profile.username,
                info: this.state.userInfo,
                alias: this.state.userAlias,
                skills: userSkills
            };
            if (this.state.userImage !== this.props.profile.img) {
                userData.img = this.state.uploadImage;
            }
            this.props.updateUser(userData);
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            formDataChange: true
        });
    };

    handleSkillAddition(tag) {
        const userSkillTags = [].concat(this.state.userSkillTags, tag)
        this.setState({ userSkillTags, formDataChange: true });
    }

    handleSkillDeletion(index) {
        const userSkillTags = this.state.userSkillTags.slice(0);
        userSkillTags.splice(index, 1);
        this.setState({ userSkillTags, formDataChange: true });
    }

    handleCropperModal() {
        this.setState({ showCropperModal: !this.state.showCropperModal}, function(){
            if (!this.state.showCropperModal) {
                delete this.state.imageValidationError;
                delete this.state.imageValidationMessage;
            }
        });
    }
    updateProfileImg = (imagesrc, imageFile) => {
        this.setState({ userImage: imagesrc, uploadImage : imageFile, imgDataLoaded: true });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {
                        !this.state.showLoader ?
                        <Form onSubmit={this.handleProfileFormSubmit.bind(this)}>
                        <FormGroup controlId="username">
                            <ControlLabel>Username</ControlLabel>
                            <div>
                            <h5 className="lbl-user-name">www.thelabz.com/</h5>
                            <FormControl
                                disabled
                                type="text"
                                className="txt-username"
                                value={this.props.profile.username}
                                placeholder="Your Username"
                            />
                            </div>
                        </FormGroup>

                        <FormGroup controlId="imageUpload">
                            <ControlLabel>User Profile Image Upload</ControlLabel>
                            <div>
                                <img
                                    className="profile-image"
                                    src={this.state.userImage}
                                    alt="logo img"
                                />
                                <input
                                    id="selectFile"
                                    type="file"
                                    onChange={this.selectNewUserImg}
                                    className="fileInput"
                                    accept="image/*"
                                />
                                <label className="btn btn-success" htmlFor="selectFile" >Change Picture</label>
                            </div>

                        </FormGroup>

                        <FormGroup controlId="userInfo">
                            <ControlLabel>About you</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.userInfo}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="skills">
                            <ControlLabel>Skill Identification Tags</ControlLabel>
                            <div className="react-tag">
                                <ReactTags
                                    placeholder="singer, writer, music producer..."
                                    tags={this.state.userSkillTags}
                                    // suggestions={this.props.searchResults}
                                    handleDelete={this.handleSkillDeletion}
                                    handleAddition={this.handleSkillAddition}
                                    allowNew
                                />{' '}
                                <span style={{ color: "orange" }}>Press 'Enter' key to add tag.</span>
                            </div>
                        </FormGroup>

                        <FormGroup controlId="userAlias">
                            <ControlLabel>Alias(Optional) </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.userAlias}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <div className="button-group">
                        <Button bsStyle="primary" className="mr10" type="submit" disabled={!this.state.formDataChange}>Submit</Button>
                        <Button bsStyle="default" onClick={this.resetFormValues.bind(this)}>Cancel</Button>
                        </div>
                    </Form>
                        :
                        <Loader />
                }
                </div>

                {this.state.showCropperModal ?
                    <ImageCropper
                        imageSrc={this.state.tempUserImgSrc}
                        imageFile={this.state.tempUserImgFile}
                        validationError={this.state.imageValidationError}
                        validationMsg={this.state.imageValidationMessage}
                        addImage={this.updateProfileImg}
                        handleModal={this.handleCropperModal.bind(this)}
                        dataLoaded={this.state.imgDataLoaded}
                    />
                    : null
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps({ profile }) {
    return {
        profile: profile.profile
    };
}

export default connect(mapStateToProps, {
    updateUser: profileActions.updateUser
})(withRouter(Profile));