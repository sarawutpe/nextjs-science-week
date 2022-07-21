import * as actions from '../actionTypes';

// add certificate action
export const addCertificateRequest = (payload) => ({
  type: actions.ADD_CERTIFICATE_REQUEST,
  payload,
});

export const addCertificateFetching = () => ({
  type: actions.ADD_CERTIFICATE_FETCHING,
});

export const addCertificateSuccess = (payload) => ({
  type: actions.ADD_CERTIFICATE_SUCCESS,
  payload,
});

export const addCertificateFailed = (payload) => ({
  type: actions.ADD_CERTIFICATE_FAILED,
  payload,
});

// get certificate action
export const getCertificateRequest = (payload) => ({
  type: actions.GET_CERTIFICATE_REQUEST,
  payload,
});

export const getCertificateFetching = () => ({
  type: actions.GET_CERTIFICATE_FETCHING,
});

export const getCertificateSuccess = (payload) => ({
  type: actions.GET_CERTIFICATE_SUCCESS,
  payload,
});

export const getCertificateFailed = (payload) => ({
  type: actions.GET_CERTIFICATE_FAILED,
  payload,
});

// get certificate by id action
export const getCertificateByTypeRequest = (payload) => ({
  type: actions.GET_CERTIFICATE_BY_TYPE_REQUEST,
  payload,
});

export const getCertificateByTypeFetching = () => ({
  type: actions.GET_CERTIFICATE_BY_TYPE_FETCHING,
});

export const getCertificateByTypeSuccess = (payload) => ({
  type: actions.GET_CERTIFICATE_BY_TYPE_SUCCESS,
  payload,
});

export const getCertificateByTypeFailed = (payload) => ({
  type: actions.GET_CERTIFICATE_BY_TYPE_FAILED,
  payload,
});

// update certificate action
export const updateCertificateRequest = (payload) => ({
  type: actions.UPDATE_CERTIFICATE_REQUEST,
  payload,
});

export const updateCertificateFetching = () => ({
  type: actions.UPDATE_CERTIFICATE_FETCHING,
});

export const updateCertificateSuccess = (payload) => ({
  type: actions.UPDATE_CERTIFICATE_SUCCESS,
  payload,
});

export const updateCertificateFailed = (payload) => ({
  type: actions.UPDATE_CERTIFICATE_FAILED,
  payload,
});

// delete certificate action
export const deleteCertificateRequest = (payload) => ({
  type: actions.DELETE_CERTIFICATE_REQUEST,
  payload,
});

export const deleteCertificateFetching = () => ({
  type: actions.DELETE_CERTIFICATE_FETCHING,
});

export const deleteCertificateSuccess = (payload) => ({
  type: actions.DELETE_CERTIFICATE_SUCCESS,
  payload,
});

export const deleteCertificateFailed = (payload) => ({
  type: actions.DELETE_CERTIFICATE_FAILED,
  payload,
});
