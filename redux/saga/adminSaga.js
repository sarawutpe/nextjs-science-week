import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add admin
export function* addAdmin({ payload }) {
  try {
    yield put(actions.addAdminFetching());
    const result = yield call(httpClient.post, '/account-management/admin', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addAdminSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.addAdminFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addAdminFailed(result.data));
  }
}

// get admin
export function* getAdmin({ payload }) {
  try {
    yield put(actions.getAdminFetching());
    const result = yield call(
      httpClient.get,
      payload
        ? `/account-management/admin?search=${payload}`
        : '/account-management/admin'
    );

    // check result
    if (result.data.status) {
      yield put(actions.getAdminSuccess(result.data));
    } else {
      yield put(actions.getAdminFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getAdminFailed(result.data));
  }
}

// get admin by id
export function* getAdminById({ payload }) {
  try {
    yield put(actions.getAdminByIdFetching());
    const result = yield call(httpClient.get, `/account-management/admin/${payload}`);

    // check result
    if (result.data.status) {
      yield put(actions.getAdminByIdSuccess(result.data));
    } else {
      yield put(actions.getAdminByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getAdminByIdFailed(result.data));
  }
}

// update admin
export function* updateAdmin({ payload }) {
  try {
    yield put(actions.updateAdminFetching());
    const result = yield call(
      httpClient.put,
      `/account-management/admin/${payload.get('id')}`,
      payload
    );

    // check result
    if (result.data.status) {
      yield put(actions.updateAdminSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.updateAdminFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateAdminFailed(result.data));
  }
}

export function* deleteAdmin({ payload }) {
  try {
    yield put(actions.deleteAdminFetching());
    const result = yield call(httpClient.delete, `/account-management/admin/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteAdminSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteAdminFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteAdminFailed(result.data));
  }
}
