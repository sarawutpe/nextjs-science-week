import * as actions from '../actionTypes';

// add participant
export const addParticipantRequest = (payload) => ({
  type: actions.ADD_PARTICIPANT_REQUEST,
  payload,
});

export const addParticipantFetching = () => ({
  type: actions.ADD_PARTICIPANT_FETCHING,
});

export const addParticipantSuccess = (payload) => ({
  type: actions.ADD_PARTICIPANT_SUCCESS,
  payload,
});

export const addParticipantFailed = (payload) => ({
  type: actions.ADD_PARTICIPANT_FAILED,
  payload,
});

// get participant
export const getParticipantRequest = (payload) => ({
  type: actions.GET_PARTICIPANT_REQUEST,
  payload,
});

export const getParticipantFetching = () => ({
  type: actions.GET_PARTICIPANT_FETCHING,
});

export const getParticipantSuccess = (payload) => ({
  type: actions.GET_PARTICIPANT_SUCCESS,
  payload,
});

export const getParticipantFailed = (payload) => ({
  type: actions.GET_PARTICIPANT_FAILED,
  payload,
});

// get participant by member id
export const getParticipantByAdminIdRequest = (payload) => ({
  type: actions.GET_PARTICIPANT_BY_ADMIN_ID_REQUEST,
  payload,
});

export const getParticipantByAdminIdFetching = () => ({
  type: actions.GET_PARTICIPANT_BY_ADMIN_ID_FETCHING,
});

export const getParticipantByAdminIdSuccess = (payload) => ({
  type: actions.GET_PARTICIPANT_BY_ADMIN_ID_SUCCESS,
  payload,
});

export const getParticipantByAdminIdFailed = (payload) => ({
  type: actions.GET_PARTICIPANT_BY_ADMIN_ID_FAILED,
  payload,
});

// update participant
export const updateParticipantRequest = (payload) => ({
  type: actions.UPDATE_PARTICIPANT_REQUEST,
  payload,
});

export const updateParticipantFetching = () => ({
  type: actions.UPDATE_PARTICIPANT_FETCHING,
});

export const updateParticipantSuccess = (payload) => ({
  type: actions.UPDATE_PARTICIPANT_SUCCESS,
  payload,
});

export const updateParticipantFailed = (payload) => ({
  type: actions.UPDATE_PARTICIPANT_FAILED,
  payload,
});

// delete participant
export const deleteParticipantRequest = (payload) => ({
  type: actions.DELETE_PARTICIPANT_REQUEST,
  payload,
});

export const deleteParticipantFetching = () => ({
  type: actions.DELETE_PARTICIPANT_FETCHING,
});

export const deleteParticipantSuccess = (payload) => ({
  type: actions.DELETE_PARTICIPANT_SUCCESS,
  payload,
});

export const deleteParticipantFailed = (payload) => ({
  type: actions.DELETE_PARTICIPANT_FAILED,
  payload,
});
