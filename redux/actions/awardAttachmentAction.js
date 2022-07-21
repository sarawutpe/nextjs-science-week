import * as actions from '../actionTypes';

// add award attachment action
export const addAwardAttachmentRequest = (payload) => ({
  type: actions.ADD_AWARD_ATTACHMENT_REQUEST,
  payload,
});

export const addAwardAttachmentFetching = () => ({
  type: actions.ADD_AWARD_ATTACHMENT_FETCHING,
});

export const addAwardAttachmentSuccess = (payload) => ({
  type: actions.ADD_AWARD_ATTACHMENT_SUCCESS,
  payload,
});

export const addAwardAttachmentFailed = (payload) => ({
  type: actions.ADD_AWARD_ATTACHMENT_FAILED,
  payload,
});

// get attachment action
export const getAwardAttachmentRequest = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_REQUEST,
  payload,
});

export const getAwardAttachmentFetching = () => ({
  type: actions.GET_AWARD_ATTACHMENT_FETCHING,
});

export const getAwardAttachmentSuccess = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_SUCCESS,
  payload,
});

export const getAwardAttachmentFailed = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_FAILED,
  payload,
});

export const getAwardAttachmentByIdRequest = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_BY_ID_REQUEST,
  payload,
});

// get attachment by id action
export const getAwardAttachmentByIdFetching = () => ({
  type: actions.GET_AWARD_ATTACHMENT_BY_ID_FETCHING,
});

export const getAwardAttachmentByIdSuccess = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_BY_ID_SUCCESS,
  payload,
});

export const getAwardAttachmentByIdFailed = (payload) => ({
  type: actions.GET_AWARD_ATTACHMENT_BY_ID_FAILED,
  payload,
});

// update award attachment
export const updateAwardAttachmentRequest = (payload) => ({
  type: actions.UPDATE_AWARD_ATTACHMENT_REQUEST,
  payload,
});

export const updateAwardAttachmentFetching = () => ({
  type: actions.UPDATE_AWARD_ATTACHMENT_FETCHING,
});

export const updateAwardAttachmentSuccess = (payload) => ({
  type: actions.UPDATE_AWARD_ATTACHMENT_SUCCESS,
  payload,
});

export const updateAwardAttachmentFailed = (payload) => ({
  type: actions.UPDATE_AWARD_ATTACHMENT_FAILED,
  payload,
});

// delete award attachment
export const deleteAwardAttachmentRequest = (payload) => ({
  type: actions.DELETE_AWARD_ATTACHMENT_REQUEST,
  payload,
});

export const deleteAwardAttachmentFetching = () => ({
  type: actions.DELETE_AWARD_ATTACHMENT_FETCHING,
});

export const deleteAwardAttachmentSuccess = (payload) => ({
  type: actions.DELETE_AWARD_ATTACHMENT_SUCCESS,
  payload,
});

export const deleteAwardAttachmentFailed = (payload) => ({
  type: actions.DELETE_AWARD_ATTACHMENT_FAILED,
  payload,
});
