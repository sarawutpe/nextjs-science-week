import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add award level
export function* addAwardLevel({ payload }) {
  try {
    yield put(actions.addAwardLevelFetching());
    const result = yield call(
      httpClient.post,
      '/competition-management/award-level',
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.addAwardLevelSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addAwardLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addAwardLevelFailed(result.data));
  }
}

// get award level
export function* getAwardLevel({ payload }) {
  try {
    yield put(actions.getAwardLevelFetching());
    const result = yield call(httpClient.get, '/competition-management/award-level');
    // check result
    if (result.data.status) {
      yield put(actions.getAwardLevelSuccess(result.data));
    } else {
      yield put(actions.getAwardLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getAwardLevelFailed(result.data));
  }
}

// update award level
export function* updateAwardLevel({ payload }) {
  try {
    yield put(actions.updateAwardLevelFetching());
    const result = yield call(
      httpClient.put,
      `/competition-management/award-level/${payload.id}`,
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.updateAwardLevelSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateAwardLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateAwardLevelFailed(result.data));
  }
}

// delete award level
export function* deleteAwardLevel({ payload }) {
  try {
    yield put(actions.deleteAwardLevelFetching());
    const result = yield call(
      httpClient.delete,
      `/competition-management/award-level/${payload}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.deleteAwardLevelSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteAwardLevelFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteAwardLevelFailed(result.data));
  }
}
