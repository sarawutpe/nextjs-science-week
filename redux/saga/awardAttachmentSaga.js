import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add award attachment
export function* addAwardAttachment({ payload }) {
  try {
    yield put(actions.addAwardAttachmentFetching());
    const result = yield call(httpClient.post, '/activity-management/award-attachment', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addAwardAttachmentSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addAwardAttachmentFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addAwardAttachmentFailed(result.data));
  }
}

// get award attachment
export function* getAwardAttachment({ payload }) {
  try {
    yield put(actions.getAwardAttachmentFetching());
    const result = yield call(httpClient.get, payload ? `/activity-management/award-attachment?search=${payload}` : '/activity-management/award-attachment');
    // check result
    if (result.data.status) {
      yield put(actions.getAwardAttachmentSuccess(result.data));
    } else {
      yield put(actions.getAwardAttachmentFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getAwardAttachmentFailed(result.data));
  }
}

// get award attachment by id
export function* getAwardAttachmentById({ payload }) {
  try {
    yield put(actions.getAwardAttachmentByIdFetching());
    const result = yield call(httpClient.get, `/activity-management/award-attachment/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getAwardAttachmentByIdSuccess(result.data));
    } else {
      yield put(actions.getAwardAttachmentByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getAwardAttachmentByIdFailed(result.data));
  }
}

// update award attachment
export function* updateAwardAttachment({ payload }) {
  try {
    yield put(actions.updateAwardAttachmentFetching());
    const result = yield call(httpClient.put, `/activity-management/award-attachment/${payload.get('id')}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateAwardAttachmentSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateAwardAttachmentFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateAwardAttachmentFailed(result.data));
  }
}

// delete award attachment
export function* deleteAwardAttachment({ payload }) {
  try {
    yield put(actions.deleteAwardAttachmentFetching());
    const result = yield call(httpClient.delete, `/activity-management/award-attachment/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteAwardAttachmentSuccess(result.data));
      yield put(actions.getAwardAttachmentRequest());
    } else {
      yield put(actions.deleteAwardAttachmentFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteAwardAttachmentFailed(result.data));
  }
}
