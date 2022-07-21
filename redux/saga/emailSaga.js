import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// send email
export function* sendEmail({ payload }) {
  try {
    yield put(actions.sendEmailFetching());
    const result = yield call(httpClient.post, '/email/send', payload);
    // check result
    if (result.data.status) {
      toast.success(result?.data?.data);
      yield put(actions.sendEmailSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.sendEmailFailed(result.data));
    }
  } catch (error) {
    yield put(actions.sendEmailFailed(result.data));
  }
}