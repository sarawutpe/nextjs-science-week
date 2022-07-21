import * as actions from '../actionTypes';

// get site reducer
export const getSiteReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_SITE_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_SITE_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_SITE_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// update site reducer
export const updateSiteReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_SITE_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_SITE_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_SITE_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
