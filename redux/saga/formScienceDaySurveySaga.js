import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// get form science day survey
export function* getFormScienceDaySurvey({ payload }) {
  try {
    yield put(actions.getFormScienceDaySurveyFetching());
    const result = yield call(httpClient.get, '/form-management/form-science-day-survey');
    // check result
    if (result.data.status) {
      yield put(actions.getFormScienceDaySurveySuccess(result.data));
    } else {
      yield put(actions.getFormScienceDaySurveyFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getFormScienceDaySurveyFailed(result.data));
  }
}
