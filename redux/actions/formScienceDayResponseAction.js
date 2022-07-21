import * as actions from '../actionTypes';

// add form science day responses action
export const addFormScienceDayResponseRequest = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_RESPONSE_REQUEST,
  payload,
});

export const addFormScienceDayResponseFetching = () => ({
  type: actions.ADD_FORM_SCIENCE_DAY_RESPONSE_FETCHING,
});

export const addFormScienceDayResponseSuccess = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_RESPONSE_SUCCESS,
  payload,
});

export const addFormScienceDayResponseFailed = (payload) => ({
  type: actions.ADD_FORM_SCIENCE_DAY_RESPONSE_FAILED,
  payload,
});

// get form science day responses action
export const getFormScienceDayResponseRequest = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_RESPONSE_REQUEST,
  payload,
});

export const getFormScienceDayResponseFetching = () => ({
  type: actions.GET_FORM_SCIENCE_DAY_RESPONSE_FETCHING,
});

export const getFormScienceDayResponseSuccess = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_RESPONSE_SUCCESS,
  payload,
});

export const getFormScienceDayResponseFailed = (payload) => ({
  type: actions.GET_FORM_SCIENCE_DAY_RESPONSE_FAILED,
  payload,
});
