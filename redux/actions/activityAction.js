import * as actions from '../actionTypes';

// add activity action
export const addActivityRequest = (payload) => ({
  type: actions.ADD_ACTIVITY_REQUEST,
  payload,
});

export const addActivityFetching = () => ({
  type: actions.ADD_ACTIVITY_FETCHING,
});

export const addActivitySuccess = (payload) => ({
  type: actions.ADD_ACTIVITY_SUCCESS,
  payload,
});

export const addActivityFailed = (payload) => ({
  type: actions.ADD_ACTIVITY_FAILED,
  payload,
});

// get activity action
export const getActivityRequest = (payload) => ({
  type: actions.GET_ACTIVITY_REQUEST,
  payload,
});

export const getActivityFetching = () => ({
  type: actions.GET_ACTIVITY_FETCHING,
});

export const getActivitySuccess = (payload) => ({
  type: actions.GET_ACTIVITY_SUCCESS,
  payload,
});

export const getActivityFailed = (payload) => ({
  type: actions.GET_ACTIVITY_FAILED,
  payload,
});

// get activity by admin id action
export const getActivityByAdminIdRequest = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ADMIN_ID_REQUEST,
  payload,
});

export const getActivityByAdminIdFetching = () => ({
  type: actions.GET_ACTIVITY_BY_ADMIN_ID_FETCHING,
});

export const getActivityByAdminIdSuccess = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ADMIN_ID_SUCCESS,
  payload,
});

export const getActivityByAdminIdFailed = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ADMIN_ID_FAILED,
  payload,
});

// get activity by id action
export const getActivityByIdRequest = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ID_REQUEST,
  payload,
});

export const getActivityByIdFetching = () => ({
  type: actions.GET_ACTIVITY_BY_ID_FETCHING,
});

export const getActivityByIdSuccess = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ID_SUCCESS,
  payload,
});

export const getActivityByIdFailed = (payload) => ({
  type: actions.GET_ACTIVITY_BY_ID_FAILED,
  payload,
});

// get activity detail
export const getActivityDetailRequest = (payload) => ({
  type: actions.GET_ACTIVITY_DETAIL_REQUEST,
  payload,
});

export const getActivityDetailFetching = () => ({
  type: actions.GET_ACTIVITY_DETAIL_FETCHING,
});

export const getActivityDetailSuccess = (payload) => ({
  type: actions.GET_ACTIVITY_DETAIL_SUCCESS,
  payload,
});

export const getActivityDetailFailed = (payload) => ({
  type: actions.GET_ACTIVITY_DETAIL_FAILED,
  payload,
});

// update activit action
export const updateActivityRequest = (payload) => ({
  type: actions.UPDATE_ACTIVITY_REQUEST,
  payload,
});

export const updateActivityFetching = () => ({
  type: actions.UPDATE_ACTIVITY_FETCHING,
});

export const updateActivitySuccess = (payload) => ({
  type: actions.UPDATE_ACTIVITY_SUCCESS,
  payload,
});

export const updateActivityFailed = (payload) => ({
  type: actions.UPDATE_ACTIVITY_FAILED,
  payload,
});

// delete activity action
export const deleteActivityRequest = (payload) => ({
  type: actions.DELETE_ACTIVITY_REQUEST,
  payload,
});

export const deleteActivityFetching = () => ({
  type: actions.DELETE_ACTIVITY_FETCHING,
});

export const deleteActivitySuccess = (payload) => ({
  type: actions.DELETE_ACTIVITY_SUCCESS,
  payload,
});

export const deleteActivityFailed = (payload) => ({
  type: actions.DELETE_ACTIVITY_FAILED,
  payload,
});
