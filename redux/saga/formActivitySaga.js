import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add form activity
export function* addFormActivity({ payload }) {
  try {
    yield put(actions.addFormActivityFetching());
    const result = yield call(httpClient.post, '/form-management/form-activity', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addFormActivitySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addFormActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addFormActivityFailed(result.data));
  }
}

// get form activity
export function* getFormActivityByMemberId({ payload }) {
  try {
    yield put(actions.getFormActivityByMemberIdFetching());
    const result = yield call(httpClient.get, `/form-management/form-activity/member/${payload})`);
    // check result
    if (result.data.status) {
      yield put(actions.getFormActivityByMemberIdSuccess(result.data));
    } else {
      yield put(actions.getFormActivityByMemberIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormActivityByMemberIdFailed(result.data));
  }
}

// get form activity by id
export function* getFormActivityById({ payload }) {
  try {
    yield put(actions.getFormActivityByIdFetching());
    const result = yield call(httpClient.get, `/form-management/form-activity/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getFormActivityByIdSuccess(result.data));
    } else {
      yield put(actions.getFormActivityByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormActivityByIdFailed(result.data));
  }
}

// update form activity
export function* updateFormActivity({ payload }) {
  try {
    yield put(actions.updateFormActivityFetching());
    const result = yield call(httpClient.put, `/form-management/form-activity/${payload.id}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateFormActivitySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateFormActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateFormActivityFailed(result.data));
  }
}

// delete form activity
export function* deleteFormActivity({ payload }) {
  try {
    yield put(actions.deleteFormActivityFetching());
    const result = yield call(httpClient.delete, `/form-management/form-activity/${payload}`);
    // check result
    if (result.data.status) {
      Router.push(Router.pathname);
      yield put(actions.deleteFormActivitySuccess(result.data));
    } else {
      yield put(actions.deleteFormActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteFormActivityFailed(result.data));
  }
}
