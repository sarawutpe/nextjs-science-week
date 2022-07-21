import * as actions from '../actionTypes';

// add admin action
export const addAdminRequest = (payload) => ({
  type: actions.ADD_ADMIN_REQUEST,
  payload,
});

export const addAdminFetching = () => ({
  type: actions.ADD_ADMIN_FETCHING,
});

export const addAdminSuccess = (payload) => ({
  type: actions.ADD_ADMIN_SUCCESS,
  payload,
});

export const addAdminFailed = (payload) => ({
  type: actions.ADD_ADMIN_FAILED,
  payload,
});

// get admin action
export const getAdminRequest = (payload) => ({
  type: actions.GET_ADMIN_REQUEST,
  payload,
});

export const getAdminFetching = () => ({
  type: actions.GET_ADMIN_FETCHING,
});

export const getAdminSuccess = (payload) => ({
  type: actions.GET_ADMIN_SUCCESS,
  payload,
});

export const getAdminFailed = (payload) => ({
  type: actions.GET_ADMIN_FAILED,
  payload,
});

// get admin by id action
export const getAdminByIdRequest = (payload) => ({
  type: actions.GET_ADMIN_BY_ID_REQUEST,
  payload,
});

export const getAdminByIdFetching = () => ({
  type: actions.GET_ADMIN_BY_ID_FETCHING,
});

export const getAdminByIdSuccess = (payload) => ({
  type: actions.GET_ADMIN_BY_ID_SUCCESS,
  payload,
});

export const getAdminByIdFailed = (payload) => ({
  type: actions.GET_ADMIN_BY_ID_FAILED,
  payload,
});

export const updateAdminRequest = (payload) => ({
  type: actions.UPDATE_ADMIN_REQUEST,
  payload,
});

// update admin action
export const updateAdminFetching = () => ({
  type: actions.UPDATE_ADMIN_FETCHING,
});

export const updateAdminSuccess = (payload) => ({
  type: actions.UPDATE_ADMIN_SUCCESS,
  payload,
});

export const updateAdminFailed = (payload) => ({
  type: actions.UPDATE_ADMIN_FAILED,
  payload,
});

// delete admin action
export const deleteAdminRequest = (payload) => ({
  type: actions.DELETE_ADMIN_REQUEST,
  payload,
});

export const deleteAdminFetching = () => ({
  type: actions.DELETE_ADMIN_FETCHING,
});

export const deleteAdminSuccess = (payload) => ({
  type: actions.DELETE_ADMIN_SUCCESS,
  payload,
});

export const deleteAdminFailed = (payload) => ({
  type: actions.DELETE_ADMIN_FAILED,
  payload,
});
