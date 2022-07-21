import * as actions from '../actionTypes';

// get site action
export const getSiteRequest = (payload) => ({
  type: actions.GET_SITE_REQUEST,
  payload,
});

export const getSiteFetching = () => ({
  type: actions.GET_SITE_FETCHING,
});

export const getSiteSuccess = (payload) => ({
  type: actions.GET_SITE_SUCCESS,
  payload,
});

export const getSiteFailed = (payload) => ({
  type: actions.GET_SITE_FAILED,
  payload,
});

// update site action
export const updateSiteRequest = (payload) => ({
  type: actions.UPDATE_SITE_REQUEST,
  payload,
});

export const updateSiteFetching = () => ({
  type: actions.UPDATE_SITE_FETCHING,
});

export const updateSiteSuccess = (payload) => ({
  type: actions.UPDATE_SITE_SUCCESS,
  payload,
});

export const updateSiteFailed = (payload) => ({
  type: actions.UPDATE_SITE_FAILED,
  payload,
});
