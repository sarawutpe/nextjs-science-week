import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add form science day
export function* addFormScienceDay({ payload }) {
  try {
    yield put(actions.addFormScienceDayFetching());
    const result = yield call(httpClient.post, '/form-management/form-science-day', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addFormScienceDaySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addFormScienceDayFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addFormScienceDayFailed(result.data));
  }
}

// get form science day
export function* getFormScienceDay({ payload }) {
  try {
    yield put(actions.getFormScienceDayFetching());
    const result = yield call(httpClient.get, '/form-management/form-science-day');
    // check result
    if (result.data.status) {
      yield put(actions.getFormScienceDaySuccess(result.data));
    } else {
      yield put(actions.getFormScienceDayFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormScienceDayFailed(result.data));
  }
}

// get form science day by id
export function* getFormScienceDayById({ payload }) {
  try {
    yield put(actions.getFormScienceDayByIdFetching());
    const result = yield call(httpClient.get, `/form-management/form-science-day/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getFormScienceDayByIdSuccess(result.data));
    } else {
      yield put(actions.getFormScienceDayByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormScienceDayByIdFailed(result.data));
  }
}

// updata form science day
export function* updateFormScienceDay({ payload }) {
  try {
    yield put(actions.updateFormScienceDayFetching());
    const result = yield call(httpClient.put, `/form-management/form-science-day/${payload.id}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateFormScienceDaySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateFormScienceDayFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateFormScienceDayFailed(result.data));
  }
}

// delete form science day
export function* deleteFormScienceDay({ payload }) {
  try {
    yield put(actions.deleteFormScienceDayFetching());
    const result = yield call(httpClient.delete, `/form-management/form-science-day/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteFormScienceDaySuccess(result.data));
      Router.push(Router.pathname)
    } else {
      yield put(actions.deleteFormScienceDayFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteFormScienceDayFailed(result.data));
  }
}
