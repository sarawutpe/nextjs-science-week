import * as actions from '../actionTypes';

// add program action
export const addProgramRequest = (payload) => ({
  type: actions.ADD_PROGRAM_REQUEST,
  payload,
});

export const addProgramFetching = () => ({
  type: actions.ADD_PROGRAM_FETCHING,
});

export const addProgramSuccess = (payload) => ({
  type: actions.ADD_PROGRAM_SUCCESS,
  payload,
});

export const addProgramFailed = (payload) => ({
  type: actions.ADD_PROGRAM_FAILED,
  payload,
});

// get program action
export const getProgramRequest = (payload) => ({
  type: actions.GET_PROGRAM_REQUEST,
  payload,
});

export const getProgramFetching = () => ({
  type: actions.GET_PROGRAM_FETCHING,
});

export const getProgramSuccess = (payload) => ({
  type: actions.GET_PROGRAM_SUCCESS,
  payload,
});

export const getProgramFailed = (payload) => ({
  type: actions.GET_PROGRAM_FAILED,
  payload,
});

// get program by id action
export const getProgramByIdRequest = (payload) => ({
  type: actions.GET_PROGRAM_BY_ID_REQUEST,
  payload,
});

export const getProgramByIdFetching = () => ({
  type: actions.GET_PROGRAM_BY_ID_FETCHING,
});

export const getProgramByIdSuccess = (payload) => ({
  type: actions.GET_PROGRAM_BY_ID_SUCCESS,
  payload,
});

export const getProgramByIdFailed = (payload) => ({
  type: actions.GET_PROGRAM_BY_ID_FAILED,
  payload,
});

// get program by admin id action
export const getProgramByAdminIdRequest = (payload) => ({
  type: actions.GET_PROGRAM_BY_ADMIN_ID_REQUEST,
  payload,
});

export const getProgramByAdminIdFetching = () => ({
  type: actions.GET_PROGRAM_BY_ADMIN_ID_FETCHING,
});

export const getProgramByAdminIdSuccess = (payload) => ({
  type: actions.GET_PROGRAM_BY_ADMIN_ID_SUCCESS,
  payload,
});

export const getProgramByAdminIdFailed = (payload) => ({
  type: actions.GET_PROGRAM_BY_ADMIN_ID_FAILED,
  payload,
});

// get program detail by activity id action
export const getProgramDetailByActivityIdRequest = (payload) => ({
  type: actions.GET_PROGRAM_DETAIL_BY_ACTIVITY_ID_REQUEST,
  payload,
});

export const getProgramDetailByActivityIdFetching = () => ({
  type: actions.GET_PROGRAM_DETAIL_BY_ACTIVITY_ID_FETCHING,
});

export const getProgramDetailByActivityIdSuccess = (payload) => ({
  type: actions.GET_PROGRAM_DETAIL_BY_ACTIVITY_ID_SUCCESS,
  payload,
});

export const getProgramDetailByActivityIdFailed = (payload) => ({
  type: actions.GET_PROGRAM_DETAIL_BY_ACTIVITY_ID_FAILED,
  payload,
});

// update program action
export const updateProgramRequest = (payload) => ({
  type: actions.UPDATE_PROGRAM_REQUEST,
  payload,
});

export const updateProgramFetching = () => ({
  type: actions.UPDATE_PROGRAM_FETCHING,
});

export const updateProgramSuccess = (payload) => ({
  type: actions.UPDATE_PROGRAM_SUCCESS,
  payload,
});

export const updateProgramFailed = (payload) => ({
  type: actions.UPDATE_PROGRAM_FAILED,
  payload,
});

// delete program action
export const deleteProgramRequest = (payload) => ({
  type: actions.DELETE_PROGRAM_REQUEST,
  payload,
});

export const deleteProgramFetching = () => ({
  type: actions.DELETE_PROGRAM_FETCHING,
});

export const deleteProgramSuccess = (payload) => ({
  type: actions.DELETE_PROGRAM_SUCCESS,
  payload,
});

export const deleteProgramFailed = (payload) => ({
  type: actions.DELETE_PROGRAM_FAILED,
  payload,
});
