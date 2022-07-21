import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient from 'services/httpClient';
import { toast } from 'react-toastify';

// add program
export function* addProgram({ payload }) {
  try {
    yield put(actions.addProgramFetching());
    const result = yield call(httpClient.post, '/program-management/program', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addProgramSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result.data.data);
      yield put(actions.addProgramFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addProgramFailed(result.data));
  }
}

// get program
export function* getProgram({ payload }) {
  try {
    yield put(actions.getProgramFetching());
    const result = yield call(httpClient.get, '/program-management/program');
    // check result
    if (result.data.status) {
      yield put(actions.getProgramSuccess(result.data));
    } else {
      yield put(actions.getProgramFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getProgramFailed(result.data));
  }
}

// get program by id
export function* getProgramById({ payload }) {
  try {
    yield put(actions.getProgramByIdFetching());
    const result = yield call(httpClient.get, `/program-management/program/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getProgramByIdSuccess(result.data));
    } else {
      yield put(actions.getProgramByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getProgramByIdFailed(result.data));
  }
}

// get program by admin id
export function* getProgramByAdminId({ payload }) {
  try {
    yield put(actions.getProgramByAdminIdFetching());
    const result = yield call(
      httpClient.get,
      `/program-management/program/admin/${payload.id}?search=${payload.search || ''}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.getProgramByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getProgramByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getProgramByAdminIdFailed(result.data));
  }
}

// get program detail by activity id
export function* getProgramDetailByActivityId({ payload }) {
  try {
    yield put(actions.getProgramDetailByActivityIdFetching());
    const result = yield call(
      httpClient.get,
      `/program-management/program-detail?activity=${payload.activity}&user=${payload.user || ''}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.getProgramDetailByActivityIdSuccess(result.data));
    } else {
      yield put(actions.getProgramDetailByActivityIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getProgramDetailByActivityIdFailed(result.data));
  }
}

// update program
export function* updateProgram({ payload }) {
  try {
    yield put(actions.updateProgramFetching());
    const result = yield call(
      httpClient.put,
      `/program-management/program/${payload.get('id')}`,
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.updateProgramSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateProgramFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateProgramFailed(result.data));
  }
}

// delete program
export function* deleteProgram({ payload }) {
  try {
    yield put(actions.deleteProgramFetching());
    const result = yield call(httpClient.delete, `/program-management/program/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteProgramSuccess(result.data));
      yield put(actions.getProgramRequest());
    } else {
      yield put(actions.deleteProgramFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteProgramFailed(result.data));
  }
}
