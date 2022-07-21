import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add participant
export function* addParticipant({ payload }) {
  try {
    yield put(actions.addParticipantFetching());
    const result = yield call(httpClient.post, '/competition-management/participant', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addParticipantSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addParticipantFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addParticipantFailed(result.data));
  }
}

// get participant
export function* getParticipant({ payload }) {
  try {
    yield put(actions.getParticipantFetching());
    const result = yield call(httpClient.get, '/competition-management/participant');
    // check result
    if (result.data.status) {
      yield put(actions.getParticipantSuccess(result.data));
    } else {
      yield put(actions.getParticipantFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getParticipantFailed(result.data));
  }
}

// get participant by admin id
export function* getParticipantByAdminId({ payload }) {
  try {
    yield put(actions.getParticipantByAdminIdFetching());
    const result = yield call(httpClient.get, `/competition-management/participant/admin/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getParticipantByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getParticipantByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getParticipantByAdminIdFailed(result.data));
  }
}

// update participant
export function* updateParticipant({ payload }) {
  try {
    yield put(actions.updateParticipantFetching());
    const result = yield call(httpClient.put, '/competition-management/participant', payload);
    // check result
    if (result.data.status) {
      toast.success(result?.data?.data);
      yield put(actions.updateParticipantSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      toast.error(result?.data?.data);
      yield put(actions.updateParticipantFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateParticipantFailed(result.data));
  }
}

// delete participant
export function* deleteParticipant({ payload }) {
  try {
    yield put(actions.deleteParticipantFetching());
    const result = yield call(httpClient.delete, `competition-management/participant/${payload.participant_id}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteParticipantSuccess(result.data));
      yield put(actions.getCompetitionByIdRequest(payload.competition_id))
    } else {
      yield put(actions.deleteParticipantFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteParticipantFailed(result.data));
  }
}
