import React, { Component } from 'react';
import {
  InputGroup,
  Glyphicon,
  FormGroup,
  FormControl,
  Table,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './Storage.css';
import camelCase from 'lodash/camelCase';
import orderBy from 'lodash/orderBy';
import { connect } from 'react-redux';
import { profileActions } from '../../../actions';
import { downloadFile } from "../../../actions/audio/actions";
import Player from "../../Projects/Audio/Player/Player"
import Controls from "../../Projects/Audio/Player/Controls"
import logo from '../../../../assets/logo.png';
import Config from '../../../../Auth/config';
import Loader from '../../Projects/Loader/Loader';

const tableHeaders = ['Owner', 'Name', 'Project Name', 'Created Date', 'File Type', 'File Size'];
class StorageTable extends Component {
  constructor(props) {
    console.log("props va;ue is", props)
    super(props);
    this.state = {
      storageFiles: [],
      selectedAudio: [],
      sort: {
        order: 1,
        type: 'lastModified'
      } // order: 0 for ASC    1 for DESC
    };

  }

  resetPlayerControls = () => {
    this.controls.resetPlayer();
  }

  getImgClassForOwners(usersCount) {
    let className = "multi-img";
    if (usersCount === 2) className += " multiple-2";
    if (usersCount === 3) className += " multiple-3";
    if (usersCount >= 4) className += " multiple-4";
    return className;
  }

  showTableModal(){
    return(
        <tr className="storage-td" >
        <td colSpan="7">
            <Loader />
        </td>
        </tr>
    );
  }

  componentWillReceiveProps(nextProps){
    console.log("props value is", nextProps)
    this.setState({
      storageFiles : nextProps.storageFiles
    })
  }

  getSortIconClass(sortBy) {
    let sortClass = 'storage-glyphicon fa fa-sort ';
    if (sortBy === this.state.sort.type) {
      sortClass += this.state.sort.order === 0 ? 'fa-sort-down' : 'fa-sort-up';
    }
    return sortClass;
  }

  renderTableHeader() {
    const tableHeadersHTML = tableHeaders.map((element, id) => {

      let sortParameter = camelCase(element);

      // Handeling sortParameter for header names
      // which are not same as database attribute names
      if (sortParameter === "name") sortParameter = "fileName";
      if (sortParameter === "createdDate") sortParameter = "lastModified";

      let sortIconClass = this.getSortIconClass(sortParameter);
      let sortIcon = <span className={sortIconClass} />;

      // For setting the table header 'Owner' in center
      // if (element === 'Owner')
      //   return (
      //     <th key={id} className="centerOwnerHeader" onClick={() => this.props.handleProjectSort(sortParameter)} >
      //       <b>{element}</b>
      //       {sortIcon}
      //     </th>
      //   );
      return (
        <th key={id + 1} className={element} onClick={() => this.handleProjectSort(sortParameter)}>
          <b>{element}</b>
          {sortIcon}
        </th>
      );
    })


    let headerCheckBox =

      <th key={0} className="form-check">
        <label className="fancy-checkbox">
          {this.props.storageFiles.length > 0 ?
            <input
              className="form-check-input"
              type="checkbox"
              // checked={this.state.storageFiles.length && this.state.storageFiles.length === this.state.selectedAudio.length}
              checked={this.props.storageFiles.length > 0 && this.props.storageFiles.length === this.state.selectedAudio.length}
              onChange={this.handleShareToAllStatus}
            /> : null}
          <span><i></i></span>
        </label>
      </th>;

    if(this.props.parentName === 'ImportModal'){
      tableHeadersHTML.unshift(headerCheckBox)
    }

    return tableHeadersHTML;
  }

  handleShareToAllStatus = () => {
    let selectedAudio = []
    if (this.props.storageFiles.length === this.state.selectedAudio.length) {
      selectedAudio = [];
    } else {
      selectedAudio = this.props.storageFiles.map(file => file.audioId);
    }
    this.setState({ selectedAudio: selectedAudio, isValidationError: false });
    this.props.setSelectedAudioState(selectedAudio);
  }

  handleProjectSort(sortType) {
    console.log("this.state.sort.type", this.state.sort.type);
    console.log("sortType", sortType);

    let newSortParams = { ...this.state.sort };

    if (this.state.sort.type === sortType) {
      newSortParams.order = this.state.sort.order === 0 ? 1 : 0;
    } else {
      newSortParams.type = sortType;
    }

    let sortOrder = newSortParams.order === 0 ? 'asc' : 'desc';

    console.log("sort type is", sortType, sortOrder)

    let storageFiles = orderBy(this.state.storageFiles, sortType, sortOrder);

    this.setState({
      sort: newSortParams,
      storageFiles: storageFiles,
    });
    console.log("state value is", this.state.storageFiles)
  }

  playAudioInList = (i, e) => {
    let audiosList = this.state.storageFiles.map(function (audio) {
      if (audio.playState) {
        audio.playState = !audio.playState;
      }
      return audio;
    });
    audiosList[i].playState = true;
    let playSource = new Audio();
    playSource.src = Config.S3_PRE_PART + audiosList[i].audioSrc;
    this.setState({
      playSource,
      storageFiles: audiosList
    });
  };

  handleAudioShareStatus = (audioId) => {
    let indexOfUserId = this.state.selectedAudio.indexOf(audioId);

    if (indexOfUserId >= 0) {
      this.state.selectedAudio.splice(indexOfUserId, 1);
    } else {
      this.state.selectedAudio.push(audioId);
    }
    this.setState({ ...this.state, isValidationError: false });
    console.log(this.state.selectedAudio)
    this.props.setSelectedAudioState(this.state.selectedAudio);
  }

  renderTableData() {
    let lastModified = null;
    let xyz = "Multiple Owners";

    if (this.state.storageFiles.length > 0) {

      const tableData = this.state.storageFiles.map((element, id) => {
        lastModified = new Date(element.lastModified);
        lastModified = lastModified.getMonth() + "/" + lastModified.getDate() + "/" + (lastModified.getFullYear() % 100);
        return (
          <tr key={id} className="storage-td" >
            {this.props.parentName === 'ImportModal' ? <td className="form-check">
              <label className="fancy-checkbox">
                <input
                  className="form-check-input position-static"
                  type="checkbox"
                  checked={this.state.selectedAudio.indexOf(element.audioId) >= 0}
                  onChange={() => this.handleAudioShareStatus(element.audioId)}
                />
                <span><i></i></span>
              </label>
            </td> : null}

            <td className="t-img">
              {element.users.length > 1 ?
                <div>
                  <div className={this.getImgClassForOwners(element.users.length)}>
                    {
                      element.users.map((user, index) => {
                        if (index < 4) {
                          return <img key={index} className="creatorImage" src={user.userImage ? user.userImage : logo} alt="" />
                        }
                        return null; //added null to avoide null pointer exception
                      })
                    }
                  </div>
                  <DropdownButton title={xyz} id="storage-dropDown" >
                    {
                      element.users.map((user, index) => {
                        return (
                          <MenuItem eventKey={index + 1} key={index} >
                            <img className="storage-userImage" src={user.userImage ? user.userImage : logo} alt="" />
                            <span className="item-owner">{user.userName}</span>
                          </MenuItem>
                        )
                      })
                    }
                  </DropdownButton>
                </div>
                :
                <div>
                  <img className="storage-userImage" src={element.users[0].userImage ? element.users[0].userImage : logo} alt="" />
                  <span className="item-owner">{element.users[0].userName}</span>
                </div>
              }
            </td>

            <td className="t-file">{element.fileName.slice(0, -4)}
              {element.playState ?
                <div className="t-player">
                  <Controls onRef={ref => (this.controls = ref)} uploadItem={false} audio={element.playSource} storagePlay={true} />
                  <Player resetPlayerControls={this.resetPlayerControls} noChildControls={true} uploadItem={false} currentAudio={element.playSource} storagePlay={true} />
                </div> :
                <div className="player_before">
                  <span className="glyphicon glyphicon-play play_pause" onMouseDown={(e) => { this.playAudioInList(id, e) }} alt="play-pause" />
                  <div className="timeline"></div>
                  <div>00:00</div>
                </div>
              }
            </td>
            <td className="t-project">{element.projectName}</td>

            <td className="t-modify">{lastModified}</td>

            <td className="t-ftype">{element.fileType}</td>
            <td className="t-fsize">{this.getFileSizeInMB(element.fileSize)}</td>
            {this.props.parentName === 'Storage' ? <td className="t-action">
              <Glyphicon className="storage-glyphicon icon-storage-share" glyph="download-alt"
                onClick={() => this.downloadAudioFile(element.audioSrc, element.audioId, element.fileName, element.projectId)}
              />
              <FontAwesome className="fa-share-alt icon-storage-share" name='fa-share-alt' />
            </td> : null}

          </tr>
        );
      });
      return tableData;
    }

    else {

      return (

        <tr className="storage-td" >
          <td colSpan="7" align="center">No files in storage</td>
        </tr>
      );
    }
  }

  getFileSizeInMB(size) {
    return (size / 1000000).toFixed(2) + 'mb';
  }

  downloadAudioFile = (audioSrc, audioId, audioName, projectId) => {
    let parts = audioSrc.split('/');
    let answer = parts[parts.length - 1];
    this.props.downloadFile(answer, audioName);
  };


componentDidMount() {
  // API call
  this.props.fetchStorageFiles(this.props.profile.username, '');
}

  handleSearchBar = (event) => {
    // keyup event only for characters and numbers
    if (event.which <= 90 && event.which >= 48) {
        this.setState({ searchString: event.target.value });
        if (event.target.value.length >= 3) {
            if (!this.state.preventsearchCall) {
                // this.state.preventsearchCall = false;
                this.setState({
                    preventsearchCall: false
                });
                this.props.fetchStorageFiles(this.props.profile.profile.username, event.target.value);
            }
        }
    }
    if (event.target.value.length === 0 && event.which === 8) {
        // this.state.preventsearchCall = false;
        this.setState({
            preventsearchCall: false
        })
        this.props.fetchStorageFiles(this.props.profile.profile.username, '');
    }
}

  render() {
    return (
      <div className="full-width">
        <div className="doc-search">
          <FormGroup id="searchBar">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search keywords"
                onKeyUp={this.handleSearchBar}
              />
              <InputGroup.Addon>
                <Glyphicon glyph="menu-right" className="storage-searchBar" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </div>
        <Table responsive className="storage-tbl">
          <thead className="storage-header">
            <tr>
              {this.renderTableHeader()}
              {this.props.parentName !== "ImportModal" ? <th /> : null}
            </tr>
          </thead>
          <tbody className="storage-body">
            {this.props.showTableLoader ? this.showTableModal() : this.renderTableData()}
          </tbody>

        </Table>

      </div>
    );
  }
}

function mapStateToProps(profile,audio, projects) {
  console.log('mapStatetoProps', profile.profile.profile.username)
  return {
    username: profile.profile.profile.username,
    profile: profile.profile,
    audio,
    projects
  };
}

export default connect(
  mapStateToProps,
  {
    fetchStorageFiles: profileActions.fetchStorageFiles,
    downloadFile,
  }
)(StorageTable);
