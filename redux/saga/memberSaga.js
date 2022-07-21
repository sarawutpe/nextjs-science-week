import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add member
export function* addMember({ payload }) {
  try {
    yield put(actions.addMemberFetching());
    const result = yield call(httpClient.post, '/account-management/member', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addMemberSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.addMemberFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addMemberFailed(result.data));
  }
}

// get member
export function* getMember({ payload }) {
  try {
    yield put(actions.getMemberFetching());
    const result = yield call(
      httpClient.get,
      payload ? `/account-management/member?search=${payload}` : '/account-management/member'
    );
    // check result
    if (result.data.status) {
      yield put(actions.getMemberSuccess(result.data));
    } else {
      yield put(actions.getMemberFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getMemberFailed(result.data));
  }
}

// get member by id
export function* getMemberById({ payload }) {
  try {
    yield put(actions.getMemberByIdFetching());
    const result = yield call(httpClient.get, `/account-management/member/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getMemberByIdSuccess(result.data));
    } else {
      yield put(actions.getMemberByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getMemberByIdFailed(result.data));
  }
}

// updata member
export function* updateMember({ payload }) {
  try {
    yield put(actions.updateMemberFetching());
    const result = yield call(httpClient.put, `/account-management/member/${payload.get('id')}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateMemberSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.updateMemberFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateMemberFailed(result.data));
  }
}

// delete member
export function* deleteMember({ payload }) {
  try {
    yield put(actions.deleteMemberFetching());
    const result = yield call(httpClient.delete, `/account-management/member/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteMemberSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteMemberFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteMemberFailed(result.data));
  }
}
