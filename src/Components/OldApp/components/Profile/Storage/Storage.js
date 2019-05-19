import React, {
  Component
} from 'react';
/*import {
  InputGroup,
  Glyphicon,
  FormGroup,
  FormControl,
  Table,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';*/
// import FontAwesome from 'react-fontawesome';
import './Storage.css';
import orderBy from 'lodash/orderBy';
// import camelCase from 'lodash/camelCase';
import {
  connect
} from 'react-redux';
import {
  profileActions
} from '../../../actions';
import {
  downloadFile
} from "../../../actions/audio/actions";
/*import Player from "../../Projects/Audio/Player/Player"
import Controls from "../../Projects/Audio/Player/Controls"*/
// import logo from '../../../../assets/logo.png';
import Config from '../../../../Auth/config';
import StorageTable from './StorageTable';


// const tableHeaders = ['Owner', 'Name', 'Project Name', 'Created Date', 'File Type', 'File Size'];
class Storage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      storageFiles: [],
      searchString: "",
      sort: {
        order: 1,
        type: 'lastModified'
      }, // order: 0 for ASC && 1 for DESC
      playState: false,
      preventsearchCall: false,
      dropdownOpen: false,
      calledWhenNoUserName: false,
      showTableLoader: true
    };
    this.handleSearchBar = this.handleSearchBar.bind(this);
    // this.handleProjectSort = this.handleProjectSort.bind(this);
    // this.downloadAudioFile = this.downloadAudioFile.bind(this);
    // this.getSortIconClass = this.getSortIconClass.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // playAudioInList = (i, e) => {
  //   let audiosList = this.state.storageFiles.map(function (audio) {
  //     if (audio.playState) {
  //       audio.playState = !audio.playState;
  //     }
  //     return audio;
  //   });
  //   audiosList[i].playState = true;
  //   let playSource = new Audio();
  //   playSource.src = Config.S3_PRE_PART + audiosList[i].audioSrc;
  //   this.setState({
  //     playSource,
  //     storageFiles: audiosList
  //   });
  // };

  componentDidMount() {
    // API call
    if (this.props.username) {
      this.props.fetchStorageFiles(this.props.username, '');
      if (!this.state.calledWhenNoUserName) this.setState({
        calledWhenNoUserName: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    /* NOTE: below API call will happen when componenDidMount's API call doesn't take place */
    if (!this.state.calledWhenNoUserName && nextProps.username) {
      this.props.fetchStorageFiles(nextProps.username, '');
      this.setState({
        calledWhenNoUserName: true
      });
    }
    if (
      nextProps.storageFiles.length === 0 &&
      this.state.searchString.length > 0
    ) {

      // this.state.preventsearchCall = true;
      this.setState({
        preventsearchCall: true
      })
    }

    if (nextProps.storageFiles.length === 0) {
      this.setState({
        showTableLoader: false
      });
    }
    if (nextProps.storageFiles && nextProps.storageFiles.length) {
      let storageFiles = nextProps.storageFiles.map(element => {
        let fileType = element.audioName.split('.').pop();
        let playSource = new Audio();
        playSource.src = Config.S3_PRE_PART + element.s3Name;
        return {
          audioId: element.id,
          audioSrc: element.s3Name,
          playSource: playSource,
          projectName: element.projectName,
          projectId: element.projectId,
          users: element.users,
          lastModified: element.addedTime,
          fileName: element.audioName,
          fileType: fileType,
          fileSize: element.fileSize,
        };
      });
      let sortOrder = this.state.sort.order === 0 ? 'asc' : 'desc';
      storageFiles = orderBy(storageFiles, this.state.sort.type, sortOrder);

      this.setState({
        storageFiles: storageFiles,
        showTableLoader: false
      });

    }
  }

  handleSearchBar(event) {
    // keyup event only for characters and numbers
    if (event.which <= 90 && event.which >= 48) {
      this.setState({
        searchString: event.target.value
      });
      if (event.target.value.length >= 3) {
        if (!this.state.preventsearchCall) {
          // this.state.preventsearchCall = false;
          this.setState({
            preventsearchCall: false
          })
          this.props.fetchStorageFiles(this.props.username, event.target.value);
        }
      }
    }
    if (event.target.value.length === 0 && event.which === 8) {
      this.setState({
        preventsearchCall: false
      })
      // this.state.preventsearchCall = false;
      this.props.fetchStorageFiles(this.props.username, '');
    }
  }

  downloadAudioFile = (audioSrc, audioId, audioName, projectId) => {
    let parts = audioSrc.split('/');
    let answer = parts[parts.length - 1];
    this.props.downloadFile(answer, audioName);
  };

  // getSortIconClass(sortBy) {
  //   let sortClass = 'storage-glyphicon fa fa-sort ';
  //   if (sortBy === this.state.sort.type) {
  //     sortClass += this.state.sort.order === 0 ? 'fa-sort-down' : 'fa-sort-up';
  //   }
  //   return sortClass;
  // }

  // handleProjectSort(sortType) {
  //   let newSortParams = { ...this.state.sort };

  //   if (this.state.sort.type === sortType) {
  //     newSortParams.order = this.state.sort.order === 0 ? 1 : 0;
  //   } else {
  //     newSortParams.type = sortType;
  //   }

  //   let sortOrder = newSortParams.order === 0 ? 'asc' : 'desc';
  //   let storageFiles = orderBy(this.state.storageFiles, sortType, sortOrder);

  //   this.setState({
  //     sort: newSortParams,
  //     storageFiles: storageFiles,
  //   });
  // }

  // getFileSizeInMB(size) {
  //   return (size / 1000000).toFixed(2) + 'mb';
  // }

  /*resetPlayerControls = () => {
    this.controls.resetPlayer();
  }*/

  /*getImgClassForOwners(usersCount) {
    let className = "multi-img";
    if (usersCount === 2) className += " multiple-2";
    if (usersCount === 3) className += " multiple-3";
    if (usersCount >= 4) className += " multiple-4";
    return className;
  }*/

  render() {
    console.log("this.state.storageFiles", this.state.storageFiles)
    return ( <div className="full-width">

      <
      StorageTable showTableLoader={
        this.state.showTableLoader
      }
      parentName="Storage"
      storageFiles={
        this.state.storageFiles
      }
      />
      </div>
    );
  }
}


function mapStateToProps({
  profile
}) {
  return {
    profile: profile.profile,
    username: profile.profile.username,
    storageFiles: profile.storageFiles,
  };
}

export default connect(
  mapStateToProps, {
    fetchStorageFiles: profileActions.fetchStorageFiles,
    downloadFile,
  }
)(Storage);