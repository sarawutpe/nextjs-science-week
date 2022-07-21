import * as actions from '../actionTypes';

// add activity reducer
export const addActivityReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.ADD_ACTIVITY_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.ADD_ACTIVITY_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.ADD_ACTIVITY_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get activity reducer
export const getActivityReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_ACTIVITY_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_ACTIVITY_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_ACTIVITY_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get activity by admin id reducer
export const getActivityByAdminIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_ACTIVITY_BY_ADMIN_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_ACTIVITY_BY_ADMIN_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_ACTIVITY_BY_ADMIN_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get activity by id reducer
export const getActivityByIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_ACTIVITY_BY_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_ACTIVITY_BY_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_ACTIVITY_BY_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// get activity detail reducer
export const getActivityDetailReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_ACTIVITY_DETAIL_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_ACTIVITY_DETAIL_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_ACTIVITY_DETAIL_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// update activity reducer
export const updateActivityReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_ACTIVITY_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_ACTIVITY_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_ACTIVITY_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

// delete activity
export const deleteActivityReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.DELETE_ACTIVITY_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.DELETE_ACTIVITY_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.DELETE_ACTIVITY_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
