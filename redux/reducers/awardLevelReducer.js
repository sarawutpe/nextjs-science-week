import * as actions from '../actionTypes';

export const addAwardLevelReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.ADD_AWARD_LEVEL_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.ADD_AWARD_LEVEL_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.ADD_AWARD_LEVEL_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const getAwardLevelReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_AWARD_LEVEL_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_AWARD_LEVEL_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_AWARD_LEVEL_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const updateAwardLevelReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_AWARD_LEVEL_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_AWARD_LEVEL_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_AWARD_LEVEL_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const deleteAwardLevelReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.DELETE_AWARD_LEVEL_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.DELETE_AWARD_LEVEL_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.DELETE_AWARD_LEVEL_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
