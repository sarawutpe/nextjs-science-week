import * as actions from '../actionTypes';

export const addAwardAttachmentReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.ADD_AWARD_ATTACHMENT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.ADD_AWARD_ATTACHMENT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.ADD_AWARD_ATTACHMENT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const getAwardAttachmentReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_AWARD_ATTACHMENT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_AWARD_ATTACHMENT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_AWARD_ATTACHMENT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const getAwardAttachmentByIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.GET_AWARD_ATTACHMENT_BY_ID_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.GET_AWARD_ATTACHMENT_BY_ID_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.GET_AWARD_ATTACHMENT_BY_ID_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const updateAwardAttachmentReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_AWARD_ATTACHMENT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.UPDATE_AWARD_ATTACHMENT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.UPDATE_AWARD_ATTACHMENT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};

export const deleteAwardAttachmentReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
    case actions.DELETE_AWARD_ATTACHMENT_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null };
    case actions.DELETE_AWARD_ATTACHMENT_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload };
    case actions.DELETE_AWARD_ATTACHMENT_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload };
    default:
      return state;
  }
};
