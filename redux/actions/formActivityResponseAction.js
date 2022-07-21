import * as actions from '../actionTypes';

// add form activity responses action
export const addFormActivityResponseRequest = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_RESPONSES_REQUEST,
  payload,
});

export const addFormActivityResponseFetching = () => ({
  type: actions.ADD_FORM_ACTIVITY_RESPONSES_FETCHING,
});

export const addFormActivityResponseSuccess = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_RESPONSES_SUCCESS,
  payload,
});

export const addFormActivityResponseFailed = (payload) => ({
  type: actions.ADD_FORM_ACTIVITY_RESPONSES_FAILED,
  payload,
});

// get form activity responses by activity id action
export const getFormActivityResponseByActivityIdRequest = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_REQUEST,
  payload,
});

export const getFormActivityResponseByActivityIdFetching = () => ({
  type: actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_FETCHING,
});

export const getFormActivityResponseByActivityIdSuccess = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_SUCCESS,
  payload,
});

export const getFormActivityResponseByActivityIdFailed = (payload) => ({
  type: actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_FAILED,
  payload,
});