import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add form science day responses
export function* addFormScienceDayResponse({ payload }) {
  try {
    yield put(actions.addFormScienceDayResponseFetching());
    const result = yield call(httpClient.post, '/form-management/form-science-day-response', payload);
    // check result
    if (result.data.status) {
      toast.success(result?.data?.data);
      Router.push(Router.pathname);
      yield put(actions.addFormScienceDayResponseSuccess(result.data));
    } else {
      yield put(actions.addFormScienceDayResponseFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addFormScienceDayResponseFailed(result.data));
  }
}

// get form science day responses
export function* getFormScienceDayResponse({ payload }) {
  try {
    yield put(actions.getFormScienceDayResponseFetching());
    const result = yield call(httpClient.get, '/form-management/form-science-day-response');
    // check result
    if (result.data.status) {
      yield put(actions.getFormScienceDayResponseSuccess(result.data));
    } else {
      yield put(actions.getFormScienceDayResponseFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormScienceDayResponseFailed(result.data));
  }
}
