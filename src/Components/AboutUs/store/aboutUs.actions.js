import { aboutUsConstants } from "./aboutUs.types";
import * as AboutUsService from "../../../services/aboutUs.services";

import {
  showLoading,
  showSuccessAlert,
  showErrorAlert,
  showListLoader,
  hideListLoader,
} from "../../../utils/Alert.component/store/alert.actions";

export const createAboutUs = (data) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await AboutUsService.createAboutUs(data);
    dispatch(showSuccessAlert(res.message));
    return res;
  } catch (err) {
    dispatch(showErrorAlert(err.message));
  }
};

export const listAboutUs = (data) => async (dispatch) => {
  dispatch(showListLoader());
  try {
    const res = await AboutUsService.listAboutUs(data);
    dispatch(success(res));
    dispatch(hideListLoader());
  } catch (err) {
    dispatch(showErrorAlert(err.message));
  }
  function success(data) {
    return { type: aboutUsConstants.GET_ABOUT_LIST, payload: data };
  }
};

export const deleteAboutUs = (id) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await AboutUsService.removeAboutUs(id);
    dispatch(showSuccessAlert(res.message));
    return res;
  } catch (err) {
    dispatch(showErrorAlert(err.message));
  }
};

export const getAboutDataById = (data) => async (dispatch) => {
  try {
    const res = await AboutUsService.getAboutDataById(data);
    dispatch({
      type: aboutUsConstants.GET_ABOUT_DATA_BY_ID,
      payload: res,
    });
    return res;
  } catch (err) {
    dispatch(showErrorAlert(err.message));
  }
};

export const updateAboutUs = (id, data) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await AboutUsService.updateAboutUs(id, data);
    dispatch(showSuccessAlert(res.message));
    return res;
  } catch (err) {
    dispatch(showErrorAlert(err.message));
  }
};
