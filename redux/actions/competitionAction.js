import * as actions from '../actionTypes';

// add competition
export const addCompetitionRequest = (payload) => ({
  type: actions.ADD_COMPETITION_REQUEST,
  payload,
});

export const addCompetitionFetching = () => ({
  type: actions.ADD_COMPETITION_FETCHING,
});

export const addCompetitionSuccess = (payload) => ({
  type: actions.ADD_COMPETITION_SUCCESS,
  payload,
});

export const addCompetitionFailed = (payload) => ({
  type: actions.ADD_COMPETITION_FAILED,
  payload,
});

// get competition
export const getCompetitionRequest = (payload) => ({
  type: actions.GET_COMPETITION_REQUEST,
  payload,
});

export const getCompetitionFetching = () => ({
  type: actions.GET_COMPETITION_FETCHING,
});

export const getCompetitionSuccess = (payload) => ({
  type: actions.GET_COMPETITION_SUCCESS,
  payload,
});

export const getCompetitionFailed = (payload) => ({
  type: actions.GET_COMPETITION_FAILED,
  payload,
});

// get competition by id
export const getCompetitionByIdRequest = (payload) => ({
  type: actions.GET_COMPETITION_BY_ID_REQUEST,
  payload,
});

export const getCompetitionByIdFetching = () => ({
  type: actions.GET_COMPETITION_BY_ID_FETCHING,
});

export const getCompetitionByIdSuccess = (payload) => ({
  type: actions.GET_COMPETITION_BY_ID_SUCCESS,
  payload,
});

export const getCompetitionByIdFailed = (payload) => ({
  type: actions.GET_COMPETITION_BY_ID_FAILED,
  payload,
});

// get competition by member id
export const getCompetitionByMemberIdRequest = (payload) => ({
  type: actions.GET_COMPETITION_BY_MEMBER_ID_REQUEST,
  payload,
});

export const getCompetitionByMemberIdFetching = () => ({
  type: actions.GET_COMPETITION_BY_MEMBER_ID_FETCHING,
});

export const getCompetitionByMemberIdSuccess = (payload) => ({
  type: actions.GET_COMPETITION_BY_MEMBER_ID_SUCCESS,
  payload,
});

export const getCompetitionByMemberIdFailed = (payload) => ({
  type: actions.GET_COMPETITION_BY_MEMBER_ID_FAILED,
  payload,
});

// update competition
export const updateCompetitionRequest = (payload) => ({
  type: actions.UPDATE_COMPETITION_REQUEST,
  payload,
});

export const updateCompetitionFetching = () => ({
  type: actions.UPDATE_COMPETITION_FETCHING,
});

export const updateCompetitionSuccess = (payload) => ({
  type: actions.UPDATE_COMPETITION_SUCCESS,
  payload,
});

export const updateCompetitionFailed = (payload) => ({
  type: actions.UPDATE_COMPETITION_FAILED,
  payload,
});

// delete competition
export const deleteCompetitionRequest = (payload) => ({
  type: actions.DELETE_COMPETITION_REQUEST,
  payload,
});

export const deleteCompetitionFetching = () => ({
  type: actions.DELETE_COMPETITION_FETCHING,
});

export const deleteCompetitionSuccess = (payload) => ({
  type: actions.DELETE_COMPETITION_SUCCESS,
  payload,
});

export const deleteCompetitionFailed = (payload) => ({
  type: actions.DELETE_COMPETITION_FAILED,
  payload,
});
