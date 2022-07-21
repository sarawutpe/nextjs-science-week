import * as actions from '../actionTypes';

// get form science day survey
export const getFormScienceDaySurveyRequest = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_SURVEY_REQUEST,
  payload,
});

export const getFormScienceDaySurveyFetching = () => ({
  type: actions.GET_FORM_SCIENCE_DAY_SURVEY_FETCHING,
});

export const getFormScienceDaySurveySuccess = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_SURVEY_SUCCESS,
  payload,
});

export const getFormScienceDaySurveyFailed = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_SURVEY_FAILED,
  payload,
});