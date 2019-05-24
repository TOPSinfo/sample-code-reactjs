import t from './types';
import { API } from 'aws-amplify';
import aws from '../../../utils/aws';
import Config from '../../../Auth/config';
import history from '../../history';

export const togglePageView = page => dispatch => {
  dispatch({ type: t.TOGGLE_PAGE_VIEW, payload: page });
};

export const toggleSidebarView = page => dispatch => {
  dispatch({ type: t.TOGGLE_SIDEBAR_VIEW, payload: page });
};

export const fetchProfile = username => async dispatch => {
  if (username) {
    const user = await API.get('TheLabz', `/api/user/${username}`);
    if (user.img) user.img = Config.S3_PRE_PART + user.img;
    dispatch({ type: t.FETCH_PROFILE, payload: user });
  }
};

export const fetchStorageFiles = (username, searchValue) => async dispatch => {

  console.log('username',username);
  console.log('searchValue',searchValue);

  let apiRoute = `/api/user/${username}/storageFiles`;
  apiRoute += (searchValue.length) ? `?searchValue=${searchValue}` : '';
  const res = await API.get('TheLabz', apiRoute);
  console.log(res)
  if(res){
    res.forEach(file => {
      file.users.forEach(user => {
        if (user.userImage) user.userImage = Config.S3_PRE_PART + user.userImage;
      });
    });
  }
  dispatch({ type: t.FETCH_STORAGE_FILES, payload: res });
};

export const fetchUserAudios = username => async dispatch => {
  const res = await API.get('TheLabz', `/api/profile/user/${username}/audios`);
  dispatch({ type: t.FETCH_USER_AUDIOS, payload: res.data });
};

export const updateUser = (userData, restartTourFlag) => async dispatch => {
  if (userData.img) {
    let uploadResponse = await aws.upload(
      'user_' + userData.userId + '_' + userData.img.name,
      userData.img
    );
    userData.img = uploadResponse.Key;
  }
  let updatedUser = await API.post(
    'TheLabz',
    `/api/user/${userData.username}/updateUser`,
    { body: userData }
  );

  if(updatedUser.Attributes.img){
    updatedUser.Attributes.img = Config.S3_PRE_PART + updatedUser.Attributes.img
  }
  if (restartTourFlag) {
    history.push(`/${userData.username}`);
  }
  dispatch({ type: t.UPDATE_USER_STATUS, payload: updatedUser });
};


export const fetchPublicProfile = username => async dispatch => {
  if (username) {
    const user = await API.get('TheLabz', `/api/user/${username}/public`);
    if (user.img) user.img = Config.S3_PRE_PART + user.img;
    dispatch({ type: t.FETCH_PUBLIC_PROFILE, payload: user });
  }
};

export const fetchUserProjects = (username, searchValue) => async dispatch => {
  if (username) {
    let apiRoute = `/api/user/${username}/public/projects`;
    if(searchValue !== undefined)  apiRoute += (searchValue.length) ? `?searchValue=${searchValue}` : '';

    let projects = await API.get('TheLabz', apiRoute);

    projects = projects.map(function(project){
      project.s3Name = Config.S3_PRE_PART + project.s3Name;
      return project;
    })
    dispatch({ type: t.FETCH_USER_PROJECTS, payload: projects });
  }
};