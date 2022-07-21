import * as actions from '../actionTypes';

// add competition result
export const addCompetitionResultRequest = (payload) => ({
  type: actions.ADD_COMPETITION_RESULT_REQUEST,
  payload,
});

export const addCompetitionResultFetching = () => ({
  type: actions.ADD_COMPETITION_RESULT_FETCHING,
});

export const addCompetitionResultSuccess = (payload) => ({
  type: actions.ADD_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const addCompetitionResultFailed = (payload) => ({
  type: actions.ADD_COMPETITION_RESULT_FAILED,
  payload,
});

// get competition result
export const getCompetitionResultRequest = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_REQUEST,
  payload,
});

export const getCompetitionResultFetching = () => ({
  type: actions.GET_COMPETITION_RESULT_FETCHING,
});

export const getCompetitionResultSuccess = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const getCompetitionResultFailed = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_FAILED,
  payload,
});

// get competition result by admin id
export const getCompetitionResultByAdminIdRequest = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_REQUEST,
  payload,
});

export const getCompetitionResultByAdminIdFetching = () => ({
  type: actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_FETCHING,
});

export const getCompetitionResultByAdminIdSuccess = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_SUCCESS,
  payload,
});

export const getCompetitionResultByAdminIdFailed = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_FAILED,
  payload,
});

// get competition result by member id
export const getCompetitionResultByMemberIdRequest = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_REQUEST,
  payload,
});

export const getCompetitionResultByMemberIdFetching = () => ({
  type: actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_FETCHING,
});

export const getCompetitionResultByMemberIdSuccess = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_SUCCESS,
  payload,
});

export const getCompetitionResultByMemberIdFailed = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_FAILED,
  payload,
});

// get competition result by overview
export const getCompetitionResultByOverviewRequest = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_OVERVIEW_REQUEST,
  payload,
});

export const getCompetitionResultByOverviewFetching = () => ({
  type: actions.GET_COMPETITION_RESULT_BY_OVERVIEW_FETCHING,
});

export const getCompetitionResultByOverviewSuccess = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_OVERVIEW_SUCCESS,
  payload,
});

export const getCompetitionResultByOverviewFailed = (payload) => ({
  type: actions.GET_COMPETITION_RESULT_BY_OVERVIEW_FAILED,
  payload,
});

// get check competition result
export const getCheckCompetitionResultRequest = (payload) => ({
  type: actions.GET_CHECK_COMPETITION_RESULT_REQUEST,
  payload,
});

export const getCheckCompetitionResultFetching = () => ({
  type: actions.GET_CHECK_COMPETITION_RESULT_FETCHING,
});

export const getCheckCompetitionResultSuccess = (payload) => ({
  type: actions.GET_CHECK_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const getCheckCompetitionResultFailed = (payload) => ({
  type: actions.GET_CHECK_COMPETITION_RESULT_FAILED,
  payload,
});

// update competition result
export const updateCompetitionResultRequest = (payload) => ({
  type: actions.UPDATE_COMPETITION_RESULT_REQUEST,
  payload,
});

export const updateCompetitionResultFetching = () => ({
  type: actions.UPDATE_COMPETITION_RESULT_FETCHING,
});

export const updateCompetitionResultSuccess = (payload) => ({
  type: actions.UPDATE_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const updateCompetitionResultFailed = (payload) => ({
  type: actions.UPDATE_COMPETITION_RESULT_FAILED,
  payload,
});

// update check competition result
export const updateCheckCompetitionResultRequest = (payload) => ({
  type: actions.UPDATE_CHECK_COMPETITION_RESULT_REQUEST,
  payload,
});

export const updateCheckCompetitionResultFetching = () => ({
  type: actions.UPDATE_CHECK_COMPETITION_RESULT_FETCHING,
});

export const updateCheckCompetitionResultSuccess = (payload) => ({
  type: actions.UPDATE_CHECK_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const updateCheckCompetitionResultFailed = (payload) => ({
  type: actions.UPDATE_CHECK_COMPETITION_RESULT_FAILED,
  payload,
});

// delete competition result
export const deleteCompetitionResultRequest = (payload) => ({
  type: actions.DELETE_COMPETITION_RESULT_REQUEST,
  payload,
});

export const deleteCompetitionResultFetching = () => ({
  type: actions.DELETE_COMPETITION_RESULT_FETCHING,
});

export const deleteCompetitionResultSuccess = (payload) => ({
  type: actions.DELETE_COMPETITION_RESULT_SUCCESS,
  payload,
});

export const deleteCompetitionResultFailed = (payload) => ({
  type: actions.DELETE_COMPETITION_RESULT_FAILED,
  payload,
});
