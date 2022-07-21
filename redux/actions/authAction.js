import * as actions from '../actionTypes';

// login action
export const loginRequest = (payload) => ({
  type: actions.LOGIN_REQUEST,
  payload,
});

export const loginFetching = () => ({
  type: actions.LOGIN_FETCHING,
});

export const loginSuccess = (payload) => ({
  type: actions.LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload) => ({
  type: actions.LOGIN_FAILED,
  payload,
});

// forgot password
export const forgotPasswordRequest = (payload) => ({
  type: actions.FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordFetching = () => ({
  type: actions.FORGOT_PASSWORD_FETCHING,
});

export const forgotPasswordSuccess = (payload) => ({
  type: actions.FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailed = (payload) => ({
  type: actions.FORGOT_PASSWORD_FAILED,
  payload,
});

// reset password
export const resetPasswordRequest = (payload) => ({
  type: actions.RESET_PASSWORD_REQUEST,
  payload,
});

export const resetPasswordFetching = () => ({
  type: actions.RESET_PASSWORD_FETCHING,
});

export const resetPasswordSuccess = (payload) => ({
  type: actions.RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFailed = (payload) => ({
  type: actions.RESET_PASSWORD_FAILED,
  payload,
});

// register action
export const registerRequest = (payload) => ({
  type: actions.REGISTER_REQUEST,
  payload,
});

export const registerFetching = () => ({
  type: actions.REGISTER_FETCHING,
});

export const registerSuccess = (payload) => ({
  type: actions.REGISTER_SUCCESS,
  payload,
});

export const registerFailed = (payload) => ({
  type: actions.REGISTER_FAILED,
  payload,
});

// update password
export const updatePasswordRequest = (payload) => ({
  type: actions.UPDATE_PASSWORD_REQUEST,
  payload,
});

export const updatePasswordFetching = () => ({
  type: actions.UPDATE_PASSWORD_FETCHING,
});

export const updatePasswordSuccess = (payload) => ({
  type: actions.UPDATE_PASSWORD_SUCCESS,
  payload,
});

export const updatePasswordFailed = (payload) => ({
  type: actions.UPDATE_PASSWORD_FAILED,
  payload,
});
