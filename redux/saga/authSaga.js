import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import axios from 'axios';
import { toast } from 'react-toastify';

// login
export function* login({ payload }) {
  try {
    yield put(actions.loginFetching());
    // backend api
    const result = yield call(httpClient.post, '/auth/login', payload);
    // check result
    if (result.data.status) {
      yield put(actions.loginSuccess(result.data));
      // set session on next api
      const http = axios.create();
      const login = yield call(http.post, '/api/login', result.data.data);
      // if everyrhing is good
      if (login.data.status) {
        switch (result.data.data.level) {
          case 1:
            Router.push('/admin/view1');
            break;
          case 2:
            Router.push('/admin/view2');
            break;
          case 3:
            Router.push('/admin/view3');
            break;
          case 4:
            Router.push('/admin/view4');
            break;
          case 5:
            Router.push('/admin/view5');
            break;
          default:
            Router.push('/member');
            break;
        }
      }
    } else {
      toast.error(result.data.data);
      yield put(actions.loginFailed(result.data));
    }
  } catch (error) {
    yield put(actions.loginFailed(result.data));
  }
}

// forgot password
export function* forgotPassword({ payload }) {
  try {
    yield put(actions.forgotPasswordFetching());
    const result = yield call(httpClient.post, '/auth/forgot-password', payload);

    // check result
    if (result.data.status) {
      toast.success(result.data.data);
      yield put(actions.forgotPasswordSuccess(result.data));
    } else {
      toast.error(result.data.data);
      yield put(actions.forgotPasswordFailed(result.data));
    }
  } catch (error) {
    yield put(actions.forgotPasswordFailed(error.name));
  }
}

// reset password
export function* resetPassword({ payload }) {
  try {
    yield put(actions.resetPasswordFetching());
    const result = yield call(
      httpClient.put,
      `/auth/reset-password/${payload.token}/${payload.password}`
    );

    // check result
    if (result.data.status) {
      toast.success(result.data.data);
      yield put(actions.resetPasswordSuccess(result.data));
      yield delay(3000);
      Router.push('/auth/login');
    } else {
      toast.error(result.data.data);
      yield put(actions.resetPasswordFailed(result.data));
    }
  } catch (error) {
    yield put(actions.resetPasswordFailed(error.name));
  }
}

// register
export function* register({ payload }) {
  try {
    yield put(actions.registerFetching());
    const result = yield call(httpClient.post, '/auth/register', payload);

    // check result
    if (result.data.status) {
      toast.success(result.data.data);
      yield put(actions.registerSuccess(result.data));
    } else {
      toast.error(result.data.data);
      yield put(actions.registerFailed(result.data));
    }
  } catch (error) {
    yield put(actions.loginFailed(result.data));
  }
}

// update password
export function* updatePassword({ payload }) {
  try {
    yield put(actions.updatePasswordFetching());
    const result = yield call(httpClient.put, `/auth/password/${payload.id}`, payload);
    // check result
    if (result.data.status) {
      toast.success(result.data.data);
      yield put(actions.updatePasswordSuccess(result.data));
    } else {
      toast.error(result.data.data);
      yield put(actions.updatePasswordFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updatePasswordFailed(result.data));
  }
}
