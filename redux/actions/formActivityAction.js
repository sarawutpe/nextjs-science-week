import * as actions from '../actionTypes';

// add form activity action
export const addFormActivityRequest = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_REQUEST,
  payload,
});

export const addFormActivityFetching = () => ({
  type: actions.ADD_FORM_ACTIVITY_FETCHING,
});

export const addFormActivitySuccess = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_SUCCESS,
  payload,
});

export const addFormActivityFailed = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_FAILED,
  payload,
});

// get form activity by member id action
export const getFormActivityByMemberIdRequest = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_MEMBER_ID_REQUEST,
  payload,
});

export const getFormActivityByMemberIdFetching = () => ({
  type: actions.GET_FORM_ACTIVITY_BY_MEMBER_ID_FETCHING,
});

export const getFormActivityByMemberIdSuccess = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_MEMBER_ID_SUCCESS,
  payload,
});

export const getFormActivityByMemberIdFailed = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_MEMBER_ID_FAILED,
  payload,
});

// get form activity by id action
export const getFormActivityByIdRequest = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_ID_REQUEST,
  payload,
});

export const getFormActivityByIdFetching = () => ({
  type: actions.GET_FORM_ACTIVITY_BY_ID_FETCHING,
});

export const getFormActivityByIdSuccess = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_ID_SUCCESS,
  payload,
});

export const getFormActivityByIdFailed = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_BY_ID_FAILED,
  payload,
});

// update form activity action
export const updateFormActivityRequest = (payload) => ({
  type: actions.UPDATE_FORM_ACTIVITY_REQUEST,
  payload,
});

export const updateFormActivityFetching = () => ({
  type: actions.UPDATE_FORM_ACTIVITY_FETCHING,
});

export const updateFormActivitySuccess = (payload) => ({
  type: actions.UPDATE_FORM_ACTIVITY_SUCCESS,
  payload,
});

export const updateFormActivityFailed = (payload) => ({
  type: actions.UPDATE_FORM_ACTIVITY_FAILED,
  payload,
});

// delete form activity action
export const deleteFormActivityRequest = (payload) => ({
  type: actions.DELETE_FORM_ACTIVITY_REQUEST,
  payload,
});

export const deleteFormActivityFetching = () => ({
  type: actions.DELETE_FORM_ACTIVITY_FETCHING,
});

export const deleteFormActivitySuccess = (payload) => ({
  type: actions.DELETE_FORM_ACTIVITY_SUCCESS,
  payload,
});

export const deleteFormActivityFailed = (payload) => ({
  type: actions.DELETE_FORM_ACTIVITY_FAILED,
  payload,
});
