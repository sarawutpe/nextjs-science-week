import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add form activity responses
export function* addFormActivityResponse({ payload }) {
  try {
    yield put(actions.addFormActivityResponseFetching());
    const result = yield call(httpClient.post, '/form-management/form-activity-response', payload);
    // check result
    if (result.data.status) {
      // toast
      toast.success(result?.data?.data);
      yield put(actions.addFormActivityResponseSuccess(result.data));
    } else {
      yield put(actions.addFormActivityResponseFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addFormActivityResponseFailed(result.data));
  }
}

// get form activity responses by activity id
export function* getFormActivityResponseByActivityId({ payload }) {
  try {
    yield put(actions.getFormActivityResponseByActivityIdFetching());
    const result = yield call(httpClient.get, `/form-management/form-activity-response/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getFormActivityResponseByActivityIdSuccess(result.data));
    } else {
      yield put(actions.getFormActivityResponseByActivityIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormActivityResponseByActivityIdFailed(result.data));
  }
}
