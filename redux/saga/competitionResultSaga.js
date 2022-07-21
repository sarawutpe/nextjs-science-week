import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add competition result
export function* addCompetitionResult({ payload }) {
  try {
    yield put(actions.addCompetitionResultFetching());
    const result = yield call(httpClient.post, '/competition-management/competition-result', payload);
    // check result
    if (result.data.status) {
      Router.push(Router.pathname);
      yield put(actions.addCompetitionResultSuccess(result.data));
    } else {
      yield put(actions.addCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addCompetitionResultFailed(result.data));
  }
}

// get competition result
export function* getCompetitionResult({ payload }) {
  try {
    yield put(actions.getCompetitionResultFetching());
    const url = payload.search == '' || payload.search
    ? `/competition-management/competition-result/proof-of-payment?search=${payload.search}&activity=${payload.activity}&activity_level=${payload.activity_level}`
    : `/competition-management/competition-result?activity=${payload.activity}&activity_level=${payload.activity_level}`;
    const result = yield call(httpClient.get, url);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionResultSuccess(result.data));
    } else {
      yield put(actions.getCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionResultFailed(result.data));
  }
}

// get competition result by admin id
export function* getCompetitionResultByAdminId({ payload }) {
  try {
    yield put(actions.getCompetitionResultByAdminIdFetching());
    const result = yield call(httpClient.get, `competition-management/competition-result/admin/${payload.id}?activity=${payload.activity}&activity_level=${payload.activity_level}`);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionResultByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getCompetitionResultByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionResultByAdminIdFailed(result.data));
  }
}

// get competition result by member id
export function* getCompetitionResultByMemberId({ payload }) {
  try {
    yield put(actions.getCompetitionResultByMemberIdFetching());
    const result = yield call(httpClient.get, `competition-management/competition-result/member/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionResultByMemberIdSuccess(result.data));
    } else {
      yield put(actions.getCompetitionResultByMemberIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionResultByMemberIdFailed(result.data));
  }
}

// get competition result by overview
export function* getCompetitionResultByOverview({ payload }) {
  try {
    yield put(actions.getCompetitionResultByOverviewFetching());
    const result = yield call(httpClient.get, `competition-management/competition-result/overview/?activity=${payload.activity}&activity_level=${payload.activity_level}`);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionResultByOverviewSuccess(result.data));
    } else {
      yield put(actions.getCompetitionResultByOverviewFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionResultByOverviewFailed(result.data));
  }
}

// get check competition result 
export function* getCheckCompetitionResult({ payload }) {
  try {
    yield put(actions.getCheckCompetitionResultFetching());
    const result = yield call(httpClient.get, '/competition-management/competition-result/check');
    // check result
    if (result.data.status) {
      yield put(actions.getCheckCompetitionResultSuccess(result.data));
    } else {
      yield put(actions.getCheckCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCheckCompetitionResultFailed(result.data));
  }
}

// update competition result
export function* updateCompetitionResult({ payload }) {
  try {
    yield put(actions.updateCompetitionResultFetching());
    const result = yield call(httpClient.put, '/competition-management/competition-result', payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateCompetitionResultSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateCompetitionResultFailed(result.data));
  }
}

// update check competition result
export function* updateCheckCompetitionResult({ payload }) {
  try {
    yield put(actions.updateCheckCompetitionResultFetching());
    const result = yield call(httpClient.put, '/competition-management/competition-result/check', payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateCheckCompetitionResultSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateCheckCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateCheckCompetitionResultFailed(result.data));
  }
}

// delete competition result
export function* deleteCompetitionResult({ payload }) {
  try {
    yield put(actions.deleteCompetitionResultFetching());
    const result = yield call(httpClient.delete, `competition-management/competition-result/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteCompetitionResultSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteCompetitionResultFailed(result.data));
  }
}
