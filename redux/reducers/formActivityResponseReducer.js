import * as actions from '../actionTypes';

// add form activity responses reducer
export const addFormActivityResponseReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.ADD_FORM_ACTIVITY_RESPONSES_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.ADD_FORM_ACTIVITY_RESPONSES_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.ADD_FORM_ACTIVITY_RESPONSES_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get form activity responses by activity id reducer
export const getFormActivityResponseByActivityIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
