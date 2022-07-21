import * as actions from '../actionTypes';

// add member action
export const addMemberRequest = (payload) => ({
  type: actions.ADD_MEMBER_REQUEST,
  payload,
});

export const addMemberFetching = () => ({
  type: actions.ADD_MEMBER_FETCHING,
});

export const addMemberSuccess = (payload) => ({
  type: actions.ADD_MEMBER_SUCCESS,
  payload,
});

export const addMemberFailed = (payload) => ({
  type: actions.ADD_MEMBER_FAILED,
  payload,
});

// get member action
export const getMemberRequest = (payload) => ({
  type: actions.GET_MEMBER_REQUEST,
  payload,
});

export const getMemberFetching = () => ({
  type: actions.GET_MEMBER_FETCHING,
});

export const getMemberSuccess = (payload) => ({
  type: actions.GET_MEMBER_SUCCESS,
  payload,
});

export const getMemberFailed = (payload) => ({
  type: actions.GET_MEMBER_FAILED,
  payload,
});

// get member by id action
export const getMemberByIdRequest = (payload) => ({
  type: actions.GET_MEMBER_BY_ID_REQUEST,
  payload,
});

export const getMemberByIdFetching = () => ({
  type: actions.GET_MEMBER_BY_ID_FETCHING,
});

export const getMemberByIdSuccess = (payload) => ({
  type: actions.GET_MEMBER_BY_ID_SUCCESS,
  payload,
});

export const getMemberByIdFailed = (payload) => ({
  type: actions.GET_MEMBER_BY_ID_FAILED,
  payload,
});

// update member action
export const updateMemberRequest = (payload) => ({
  type: actions.UPDATE_MEMBER_REQUEST,
  payload,
});

export const updateMemberFetching = () => ({
  type: actions.UPDATE_MEMBER_FETCHING,
});

export const updateMemberSuccess = (payload) => ({
  type: actions.UPDATE_MEMBER_SUCCESS,
  payload,
});

export const updateMemberFailed = (payload) => ({
  type: actions.UPDATE_MEMBER_FAILED,
  payload,
});

// delete member action
export const deleteMemberRequest = (payload) => ({
  type: actions.DELETE_MEMBER_REQUEST,
  payload,
});

export const deleteMemberFetching = () => ({
  type: actions.DELETE_MEMBER_FETCHING,
});

export const deleteMemberSuccess = (payload) => ({
  type: actions.DELETE_MEMBER_SUCCESS,
  payload,
});

export const deleteMemberFailed = (payload) => ({
  type: actions.DELETE_MEMBER_FAILED,
  payload,
});