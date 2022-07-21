import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// get site
export function* getSite() {
  try {
    yield put(actions.getSiteFetching());
    const result = yield call(httpClient.get, '/site-management/site');
    // check result
    if (result.data.status) {
      yield put(actions.getSiteSuccess(result.data));
    } else {
      yield put(actions.getSiteFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getSiteSuccess(result.data));
  }
}

// update site
export function* updateSite({ payload }) {
  try {
    yield put(actions.updateSiteFetching());
    const result = yield call(httpClient.put, '/site-management/site', payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateSiteSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateSiteFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateSiteFailed(result.data));
  }
}
