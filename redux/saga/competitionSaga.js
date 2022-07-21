import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add competition
export function* addCompetition({ payload }) {
  try {
    yield put(actions.addCompetitionFetching());
    const result = yield call(httpClient.post, '/competition-management/competition', payload);
    // check result
    if (result.data.status) {
      // alert
      toast.success(result?.data?.data);
      yield put(actions.addCompetitionSuccess(result.data));
    } else {
      toast.error(result?.data?.data);
      yield put(actions.addCompetitionFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addCompetitionFailed(result.data));
  }
}

// get competition
export function* getCompetition({ payload }) {
  try {
    yield put(actions.getCompetitionFetching());
    const result = yield call(httpClient.get, payload.search ? `/competition-management/competition/${payload.id}?search=${payload.search || ''}` : `/competition-management/competition/${payload.id}`);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionSuccess(result.data));
    } else {
      yield put(actions.getCompetitionFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionFailed(result.data));
  }
}

// get competition by id
export function* getCompetitionById({ payload }) {
  try {
    yield put(actions.getCompetitionByIdFetching());
    const result = yield call(httpClient.get, `/competition-management/competition/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionByIdSuccess(result.data));
    } else {
      yield put(actions.getCompetitionByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionByIdFailed(result.data));
  }
}

// get competition by member id
export function* getCompetitionByMemberId({ payload }) {
  try {
    yield put(actions.getCompetitionByMemberIdFetching());
    const url = payload.search == '' || payload.search
    ? `/competition-management/competition/member/${payload.id}?search=${payload.search}`
    : `/competition-management/competition/member/${payload.id}`
    const result = yield call(httpClient.get, url);
    // check result
    if (result.data.status) {
      yield put(actions.getCompetitionByMemberIdSuccess(result.data));
    } else {
      yield put(actions.getCompetitionByMemberIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCompetitionByMemberIdFailed(result.data));
  }
}

// update competition
export function* updateCompetition({ payload }) {
  try {
    yield put(actions.updateCompetitionFetching());
    const result = yield call(httpClient.put, '/competition-management/competition/', payload);
    // check result
    if (result.data.status) {
      toast.success(result?.data?.data);
      yield put(actions.updateCompetitionSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.updateCompetitionFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateCompetitionFailed(result.data));
  }
}

// delete competition
export function* deleteCompetition({ payload }) {
  try {
    yield put(actions.deleteCompetitionFetching());
    const result = yield call(httpClient.delete, `competition-management/competition/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteCompetitionSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteCompetitionFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteCompetitionFailed(result.data));
  }
}


