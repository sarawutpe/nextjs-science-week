import * as actions from '../actionTypes';

// get form science day survey reducer
export const getFormScienceDaySurveyReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_FORM_SCIENCE_DAY_SURVEY_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_FORM_SCIENCE_DAY_SURVEY_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_FORM_SCIENCE_DAY_SURVEY_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
