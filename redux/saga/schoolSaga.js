import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add school
export function* addSchool({ payload }) {
  try {
    yield put(actions.addSchoolFetching());
    const result = yield call(httpClient.post, '/school-management/school', payload);
    // check result
    if (result.data.status) {
      if (result.data.data != '') {
        toast.success(result.data.data);
      }
      yield put(actions.addSchoolSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addSchoolFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addSchoolFailed(result.data));
  }
}

// get school
export function* getSchool({ payload }) {
  try {
    yield put(actions.getSchoolFetching());
    const result = yield call(httpClient.get, `/school-management/school/?search=${payload?.search ?? ''}`);
    // check result
    if (result.data.status) {
      yield put(actions.getSchoolSuccess(result.data));
    } else {
      yield put(actions.getSchoolFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getSchoolFailed(result.data));
  }
}

// update school
export function* updateSchool({ payload }) {
  try {
    yield put(actions.updateSchoolFetching());
    const result = yield call(httpClient.put, `/school-management/school/${payload.id}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateSchoolFailed(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateSchoolFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateSchoolFailed(result.data));
  }
}

// delete school
export function* deleteSchool({ payload }) {
  try {
    yield put(actions.deleteSchoolFetching());
    const result = yield call(httpClient.delete, `/school-management/school/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteSchoolSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteSchoolFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteSchoolFailed(result.data));
  }
}
