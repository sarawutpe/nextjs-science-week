import * as actions from '../actionTypes';

export const addFormScienceDayReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
  case actions.ADD_FORM_SCIENCE_DAY_FETCHING:
    return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null }
  case actions.ADD_FORM_SCIENCE_DAY_SUCCESS:
    return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload }
  case actions.ADD_FORM_SCIENCE_DAY_FAILED:
    return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload }
  default:
    return state
  }
}

export const getFormScienceDayReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
  case actions.GET_FORM_SCIENCE_DAY_FETCHING:
    return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null }
  case actions.GET_FORM_SCIENCE_DAY_SUCCESS:
    return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload }
  case actions.GET_FORM_SCIENCE_DAY_FAILED:
    return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload }
  default:
    return state
  }
}

export const getFormScienceDayByIdReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
  case actions.GET_FORM_SCIENCE_DAY_BY_ID_FETCHING:
    return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null }
  case actions.GET_FORM_SCIENCE_DAY_BY_ID_SUCCESS:
    return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload }
  case actions.GET_FORM_SCIENCE_DAY_BY_ID_FAILED:
    return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload }
  default:
    return state
  }
}

export const updateFormScienceDayReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
  case actions.UPDATE_FORM_SCIENCE_DAY_FETCHING:
    return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null }
  case actions.UPDATE_FORM_SCIENCE_DAY_SUCCESS:
    return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload }
  case actions.UPDATE_FORM_SCIENCE_DAY_FAILED:
    return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload }
  default:
    return state
  }
}

export const deleteFormScienceDayReducer = (state = { isFetching: null, isSuccess: null, isFailed: null, result: null }, { type, payload }) => {
  switch (type) {
  case actions.DELETE_FORM_SCIENCE_DAY_FETCHING:
    return { ...state, isFetching: true, isSuccess: false, isFailed: false, result: null }
  case actions.DELETE_FORM_SCIENCE_DAY_SUCCESS:
    return { ...state, isFetching: false, isSuccess: true, isFailed: false, result: payload }
  case actions.DELETE_FORM_SCIENCE_DAY_FAILED:
    return { ...state, isFetching: false, isSuccess: false, isFailed: true, result: payload }
  default:
    return state
  }
}


