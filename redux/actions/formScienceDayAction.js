import * as actions from '../actionTypes';

// add form science day action
export const addFormScienceDayRequest = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_REQUEST,
  payload,
});

export const addFormScienceDayFetching = () => ({
  type: actions.ADD_FORM_SCIENCE_DAY_FETCHING,
});

export const addFormScienceDaySuccess = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_SUCCESS,
  payload,
});

export const addFormScienceDayFailed = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_FAILED,
  payload,
});

// get form science day action
export const getFormScienceDayRequest = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_REQUEST,
  payload,
});

export const getFormScienceDayFetching = () => ({
  type: actions.GET_FORM_SCIENCE_DAY_FETCHING,
});

export const getFormScienceDaySuccess = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_SUCCESS,
  payload,
});

export const getFormScienceDayFailed = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_FAILED,
  payload,
});

// get form science day by id action
export const getFormScienceDayByIdRequest = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_BY_ID_REQUEST,
  payload,
});

export const getFormScienceDayByIdFetching = () => ({
  type: actions.GET_FORM_SCIENCE_DAY_BY_ID_FETCHING,
});

export const getFormScienceDayByIdSuccess = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_BY_ID_SUCCESS,
  payload,
});

export const getFormScienceDayByIdFailed = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_BY_ID_FAILED,
  payload,
});

// update form science day action
export const updateFormScienceDayRequest = (payload) => ({
  type: actions.UPDATE_FORM_SCIENCE_DAY_REQUEST,
  payload,
});

export const updateFormScienceDayFetching = () => ({
  type: actions.UPDATE_FORM_SCIENCE_DAY_FETCHING,
});

export const updateFormScienceDaySuccess = (payload) => ({
  type: actions.UPDATE_FORM_SCIENCE_DAY_SUCCESS,
  payload,
});

export const updateFormScienceDayFailed = (payload) => ({
  type: actions.UPDATE_FORM_SCIENCE_DAY_FAILED,
  payload,
});

// delete form science day action
export const deleteFormScienceDayRequest = (payload) => ({
  type: actions.DELETE_FORM_SCIENCE_DAY_REQUEST,
  payload,
});

export const deleteFormScienceDayFetching = () => ({
  type: actions.DELETE_FORM_SCIENCE_DAY_FETCHING,
});

export const deleteFormScienceDaySuccess = (payload) => ({
  type: actions.DELETE_FORM_SCIENCE_DAY_SUCCESS,
  payload,
});

export const deleteFormScienceDayFailed = (payload) => ({
  type: actions.DELETE_FORM_SCIENCE_DAY_FAILED,
  payload,
});
