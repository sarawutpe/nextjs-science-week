import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// get report competition
export function* getReportCompetition({ payload }) {
  try {
    yield put(actions.getReportCompetitionFetching());
    const result = yield call(httpClient.get, '/report/competition');
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionFailed(result.data));
  }
}

// get report competition by id
export function* getReportCompetitionById({ payload }) {
  try {
    yield put(actions.getReportCompetitionByIdFetching());
    const result = yield call(httpClient.get, `/report/competition/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionByIdSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionByIdFailed(result.data));
  }
}

// get report competition result
export function* getReportCompetitionResult({ payload }) {
  try {
    yield put(actions.getReportCompetitionResultFetching());
    const result = yield call(httpClient.get, '/report/competition-result');
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionResultSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionResultFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionResultFailed(result.data));
  }
}

// get report competition result by id
export function* getReportCompetitionResultById({ payload }) {
  try {
    yield put(actions.getReportCompetitionResultByIdFetching());
    const result = yield call(httpClient.get, `/report/competition-result/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionResultByIdSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionResultByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionResultByIdFailed(result.data));
  }
}

// get report participant
export function* getReportParticipant({ payload }) {
  try {
    yield put(actions.getReportParticipantFetching());
    const result = yield call(httpClient.get, '/report/participant');
    // check result
    if (result.data.status) {
      yield put(actions.getReportParticipantSuccess(result.data));
    } else {
      yield put(actions.getReportParticipantFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportParticipantFailed(result.data));
  }
}

// get report participant by admin id
export function* getReportParticipantByAdminId({ payload }) {
  try {
    yield put(actions.getReportParticipantByAdminIdFetching());
    const result = yield call(httpClient.get, `/report/participant/admin/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getReportParticipantByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getReportParticipantByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportParticipantByAdminIdFailed(result.data));
  }
}

// get report competition award
export function* getReportCompetitionAward({ payload }) {
  try {
    yield put(actions.getReportCompetitionAwardFetching());
    const result = yield call(httpClient.get, '/report/competition-award');
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionAwardSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionAwardFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionAwardFailed(result.data));
  }
}

// get report competition award by admin id
export function* getReportCompetitionAwardByAdminId({ payload }) {
  try {
    yield put(actions.getReportCompetitionAwardByAdminIdFetching());
    const result = yield call(httpClient.get, `/report/competition-award/admin/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getReportCompetitionAwardByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getReportCompetitionAwardByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportCompetitionAwardByAdminIdFailed(result.data));
  }
}

// get report proof of payment
export function* getReportProofOfPayment({ payload }) {
  try {
    yield put(actions.getReportProofOfPaymentFetching());
    const result = yield call(httpClient.get, '/report/competition-award');
    // check result
    if (result.data.status) {
      yield put(actions.getReportProofOfPaymentSuccess(result.data));
    } else {
      yield put(actions.getReportProofOfPaymentFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getReportProofOfPaymentFailed(result.data));
  }
}
