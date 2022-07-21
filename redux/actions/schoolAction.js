import * as actions from '../actionTypes';

// add school
export const addSchoolRequest = (payload) => ({
  type: actions.ADD_SCHOOL_REQUEST,
  payload,
});

export const addSchoolFetching = () => ({
  type: actions.ADD_SCHOOL_FETCHING,
});

export const addSchoolSuccess = (payload) => ({
  type: actions.ADD_SCHOOL_SUCCESS,
  payload,
});

export const addSchoolFailed = (payload) => ({
  type: actions.ADD_SCHOOL_FAILED,
  payload,
});

// get school
export const getSchoolRequest = (payload) => ({
  type: actions.GET_SCHOOL_REQUEST,
  payload,
});

export const getSchoolFetching = () => ({
  type: actions.GET_SCHOOL_FETCHING,
});

export const getSchoolSuccess = (payload) => ({
  type: actions.GET_SCHOOL_SUCCESS,
  payload,
});

export const getSchoolFailed = (payload) => ({
  type: actions.GET_SCHOOL_FAILED,
  payload,
});

// update school
export const updateSchoolRequest = (payload) => ({
  type: actions.UPDATE_SCHOOL_REQUEST,
  payload,
});

export const updateSchoolFetching = () => ({
  type: actions.UPDATE_SCHOOL_FETCHING,
});

export const updateSchoolSuccess = (payload) => ({
  type: actions.UPDATE_SCHOOL_SUCCESS,
  payload,
});

export const updateSchoolFailed = (payload) => ({
  type: actions.UPDATE_SCHOOL_FAILED,
  payload,
});

// delete school
export const deleteSchoolRequest = (payload) => ({
  type: actions.DELETE_SCHOOL_REQUEST,
  payload,
});

export const deleteSchoolFetching = () => ({
  type: actions.DELETE_SCHOOL_FETCHING,
});

export const deleteSchoolSuccess = (payload) => ({
  type: actions.DELETE_SCHOOL_SUCCESS,
  payload,
});

export const deleteSchoolFailed = (payload) => ({
  type: actions.DELETE_SCHOOL_FAILED,
  payload,
});
