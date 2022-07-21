import * as actions from '../actionTypes';

// send email action
export const sendEmailRequest = (payload) => ({
  type: actions.SEND_EMAIL_REQUEST,
  payload,
});

export const sendEmailFetching = () => ({
  type: actions.SEND_EMAIL_FETCHING,
});

export const sendEmailSuccess = (payload) => ({
  type: actions.SEND_EMAIL_SUCCESS,
  payload,
});

export const sendEmailFailed = (payload) => ({
  type: actions.SEND_EMAIL_FAILED,
  payload,
});
