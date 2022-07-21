import * as actions from '../actionTypes';

// add award level
export const addAwardLevelRequest = (payload) => ({
  type: actions.ADD_AWARD_LEVEL_REQUEST,
  payload,
});

export const addAwardLevelFetching = () => ({
  type: actions.ADD_AWARD_LEVEL_FETCHING,
});

export const addAwardLevelSuccess = (payload) => ({
  type: actions.ADD_AWARD_LEVEL_SUCCESS,
  payload,
});

export const addAwardLevelFailed = (payload) => ({
  type: actions.ADD_AWARD_LEVEL_FAILED,
  payload,
});

// get award level
export const getAwardLevelRequest = (payload) => ({
  type: actions.GET_AWARD_LEVEL_REQUEST,
  payload,
});

export const getAwardLevelFetching = () => ({
  type: actions.GET_AWARD_LEVEL_FETCHING,
});

export const getAwardLevelSuccess = (payload) => ({
  type: actions.GET_AWARD_LEVEL_SUCCESS,
  payload,
});

export const getAwardLevelFailed = (payload) => ({
  type: actions.GET_AWARD_LEVEL_FAILED,
  payload,
});

// update award level
export const updateAwardLevelRequest = (payload) => ({
  type: actions.UPDATE_AWARD_LEVEL_REQUEST,
  payload,
});

export const updateAwardLevelFetching = () => ({
  type: actions.UPDATE_AWARD_LEVEL_FETCHING,
});

export const updateAwardLevelSuccess = (payload) => ({
  type: actions.UPDATE_AWARD_LEVEL_SUCCESS,
  payload,
});

export const updateAwardLevelFailed = (payload) => ({
  type: actions.UPDATE_AWARD_LEVEL_FAILED,
  payload,
});

// delete award level
export const deleteAwardLevelRequest = (payload) => ({
  type: actions.DELETE_AWARD_LEVEL_REQUEST,
  payload,
});

export const deleteAwardLevelFetching = () => ({
  type: actions.DELETE_AWARD_LEVEL_FETCHING,
});

export const deleteAwardLevelSuccess = (payload) => ({
  type: actions.DELETE_AWARD_LEVEL_SUCCESS,
  payload,
});

export const deleteAwardLevelFailed = (payload) => ({
  type: actions.DELETE_AWARD_LEVEL_FAILED,
  payload,
});
