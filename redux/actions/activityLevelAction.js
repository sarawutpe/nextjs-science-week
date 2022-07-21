import * as actions from '../actionTypes';

// add activity level action
export const addActivityLevelRequest = (payload) => ({
  type: actions.ADD_ACTIVITY_LEVEL_REQUEST,
  payload,
});

export const addActivityLevelFetching = () => ({
  type: actions.ADD_ACTIVITY_LEVEL_FETCHING,
});

export const addActivityLevelSuccess = (payload) => ({
  type: actions.ADD_ACTIVITY_LEVEL_SUCCESS,
  payload,
});

export const addActivityLevelFailed = (payload) => ({
  type: actions.ADD_ACTIVITY_LEVEL_FAILED,
  payload,
});

// get activity level action
export const getActivityLevelRequest = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_REQUEST,
  payload,
});

export const getActivityLevelFetching = () => ({
  type: actions.GET_ACTIVITY_LEVEL_FETCHING,
});

export const getActivityLevelSuccess = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_SUCCESS,
  payload,
});

export const getActivityLevelFailed = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_FAILED,
  payload,
});

// get activity level action
export const getActivityLevelByIdRequest = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_BY_ID_REQUEST,
  payload,
});

export const getActivityLevelByIdFetching = () => ({
  type: actions.GET_ACTIVITY_LEVEL_BY_ID_FETCHING,
});

export const getActivityLevelByIdSuccess = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_BY_ID_SUCCESS,
  payload,
});

export const getActivityLevelByIdFailed = (payload) => ({
  type: actions.GET_ACTIVITY_LEVEL_BY_ID_FAILED,
  payload,
});

// update activity level action
export const updateActivityLevelRequest = (payload) => ({
  type: actions.UPDATE_ACTIVITY_LEVEL_REQUEST,
  payload,
});

export const updateActivityLevelFetching = () => ({
  type: actions.UPDATE_ACTIVITY_LEVEL_FETCHING,
});

export const updateActivityLevelSuccess = (payload) => ({
  type: actions.UPDATE_ACTIVITY_LEVEL_SUCCESS,
  payload,
});

export const updateActivityLevelFailed = (payload) => ({
  type: actions.UPDATE_ACTIVITY_LEVEL_FAILED,
  payload,
});

// delete activity level action
export const deleteActivityLevelRequest = (payload) => ({
  type: actions.DELETE_ACTIVITY_LEVEL_REQUEST,
  payload,
});

export const deleteActivityLevelFetching = () => ({
  type: actions.DELETE_ACTIVITY_LEVEL_FETCHING,
});

export const deleteActivityLevelSuccess = (payload) => ({
  type: actions.DELETE_ACTIVITY_LEVEL_SUCCESS,
  payload,
});

export const deleteActivityLevelFailed = (payload) => ({
  type: actions.DELETE_ACTIVITY_LEVEL_FAILED,
  payload,
});
