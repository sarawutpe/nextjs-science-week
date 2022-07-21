import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add activity level
export function* addActivityLevel({ payload }) {
  try {
    yield put(actions.addActivityLevelFetching());
    const result = yield call(
      httpClient.post,
      '/activity-management/activity-level',
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.addActivityLevelSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addActivityLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addActivityLevelFailed(result.data));
  }
}

// get activity level
export function* getActivityLevel({ payload }) {
  try {
    yield put(actions.getActivityLevelFetching());
    const result = yield call(httpClient.get, '/activity-management/activity-level');

    // check result
    if (result.data.status) {
      yield put(actions.getActivityLevelSuccess(result.data));
    } else {
      yield put(actions.getActivityLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getActivityLevelFailed(result.data));
  }
}

// get activity level by id
export function* getActivityLevelById({ payload }) {
  try {
    yield put(actions.getActivityLevelByIdFetching());
    const result = yield call(
      httpClient.get,
      `/activity-management/activity-level/${payload}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.getActivityLevelByIdSuccess(result.data));
    } else {
      yield put(actions.getActivityLevelByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getActivityLevelByIdFailed(result.data));
  }
}

// update activity level
export function* updateActivityLevel({ payload }) {
  try {
    yield put(actions.updateActivityLevelFetching());
    const result = yield call(
      httpClient.put,
      `/activity-management/activity-level/${payload.id}`,
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.updateActivityLevelSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateActivityLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateActivityLevelFailed(result.data));
  }
}

// delete activity level
export function* deleteActivityLevel({ payload }) {
  try {
    yield put(actions.deleteActivityLevelFetching());
    const result = yield call(
      httpClient.delete,
      `/activity-management/activity-level/${payload}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.deleteActivityLevelSuccess(result.data));
      yield put(actions.getActivityLevelRequest());
    } else {
      yield put(actions.deleteActivityLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteActivityLevelFailed(result.data));
  }
}
