import * as actions from '../actionTypes';


// add competition result reducer
export const addCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.ADD_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.ADD_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.ADD_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get competition result reducer
export const getCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get competition result reducer
export const getCompetitionResultByAdminIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get competition result by member id reducer
export const getCompetitionResultByMemberIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get competition result by overview reducer
export const getCompetitionResultByOverviewReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_COMPETITION_RESULT_BY_OVERVIEW_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_COMPETITION_RESULT_BY_OVERVIEW_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_COMPETITION_RESULT_BY_OVERVIEW_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get check competition result reducer
export const getCheckCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_CHECK_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_CHECK_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_CHECK_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// update competition result reducer
export const updateCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// update check competition result reducer
export const updateCheckCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_CHECK_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_CHECK_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_CHECK_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// delete competition result reducer
export const deleteCompetitionResultReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.DELETE_COMPETITION_RESULT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.DELETE_COMPETITION_RESULT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.DELETE_COMPETITION_RESULT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};


