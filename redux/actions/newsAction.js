import * as actions from '../actionTypes';

// add news action
export const addNewsRequest = (payload) => ({
  type: actions.ADD_NEWS_REQUEST,
  payload,
});

export const addNewsFetching = () => ({
  type: actions.ADD_NEWS_FETCHING,
});

export const addNewsSuccess = (payload) => ({
  type: actions.ADD_NEWS_SUCCESS,
  payload,
});

export const addNewsFailed = (payload) => ({
  type: actions.ADD_NEWS_FAILED,
  payload,
});

// get news action
export const getNewsRequest = (payload) => ({
  type: actions.GET_NEWS_REQUEST,
  payload,
});

export const getNewsFetching = () => ({
  type: actions.GET_NEWS_FETCHING,
});

export const getNewsSuccess = (payload) => ({
  type: actions.GET_NEWS_SUCCESS,
  payload,
});

export const getNewsFailed = (payload) => ({
  type: actions.GET_NEWS_FAILED,
  payload,
});

// get news by id action
export const getNewsByIdRequest = (payload) => ({
  type: actions.GET_NEWS_BY_ID_REQUEST,
  payload,
});

export const getNewsByIdFetching = () => ({
  type: actions.GET_NEWS_BY_ID_FETCHING,
});

export const getNewsByIdSuccess = (payload) => ({
  type: actions.GET_NEWS_BY_ID_SUCCESS,
  payload,
});

export const getNewsByIdFailed = (payload) => ({
  type: actions.GET_NEWS_BY_ID_FAILED,
  payload,
});

// update news action
export const updateNewsRequest = (payload) => ({
  type: actions.UPDATE_NEWS_REQUEST,
  payload,
});

export const updateNewsFetching = () => ({
  type: actions.UPDATE_NEWS_FETCHING,
});

export const updateNewsSuccess = (payload) => ({
  type: actions.UPDATE_NEWS_SUCCESS,
  payload,
});

export const updateNewsFailed = (payload) => ({
  type: actions.UPDATE_NEWS_FAILED,
  payload,
});

// delete news action
export const deleteNewsRequest = (payload) => ({
  type: actions.DELETE_NEWS_REQUEST,
  payload,
});

export const deleteNewsFetching = () => ({
  type: actions.DELETE_NEWS_FETCHING,
});

export const deleteNewsSuccess = (payload) => ({
  type: actions.DELETE_NEWS_SUCCESS,
  payload,
});

export const deleteNewsFailed = (payload) => ({
  type: actions.DELETE_NEWS_FAILED,
  payload,
});
