import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';
import { toast } from 'react-toastify';

// add activity
export function* addActivity({ payload }) {
  try {
    yield put(actions.addActivityFetching());
    const result = yield call(httpClient.post, '/activity-management/activity', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addActivitySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addActivityFailed(result.data));
  }
}

// get activity
export function* getActivity({ payload }) {
  try {
    yield put(actions.getActivityFetching());
    const result = yield call(
      httpClient.get,
      payload
        ? `/activity-management/activity?search=${payload}`
        : '/activity-management/activity'
    );
    // check result
    if (result.data.status) {
      yield put(actions.getActivitySuccess(result.data));
    } else {
      yield put(actions.getActivityFailed());
    }
  } catch (error) {
    yield put(actions.getActivityFailed(result.data));
  }
}

// get activity by admin id
export function* getActivityByAdminId({ payload }) {
  try {
    yield put(actions.getActivityByAdminIdFetching());
    const result = yield call(
      httpClient.get,
      payload.search
        ? `/activity-management/activity/admin/${payload.id}?search=${payload.search}`
        : `/activity-management/activity/admin/${payload.id}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.getActivityByAdminIdSuccess(result.data));
    } else {
      yield put(actions.getActivityByAdminIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getActivityByAdminIdFailed(result.data));
  }
}

// get activity by id
export function* getActivityById({ payload }) {
  try {
    yield put(actions.getActivityByIdFetching());
    const result = yield call(httpClient.get, `/activity-management/activity/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getActivityByIdSuccess(result.data));
    } else {
      yield put(actions.getActivityByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getActivityByIdFailed(result.data));
  }
}

// get activity
export function* getActivityDetail({ payload }) {
  try {
    yield put(actions.getActivityDetailFetching());
    const result = yield call(
      httpClient.get,
      `/activity-management/activity-detail/${payload}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.getActivityDetailSuccess(result.data));
    } else {
      yield put(actions.getActivityDetailFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getActivityDetailFailed(result.data));
  }
}

// update activity
export function* updateActivity({ payload }) {
  try {
    yield put(actions.updateActivityFetching());
    const result = yield call(
      httpClient.put,
      `/activity-management/activity/${payload.id}`,
      payload
    );
    // check result
    if (result.data.status) {
      yield put(actions.updateActivitySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateActivityFailed(result.data));
  }
}

// delete activity
export function* deleteActivity({ payload }) {
  try {
    yield put(actions.deleteActivityFetching());
    const result = yield call(
      httpClient.delete,
      `/activity-management/activity/${payload}`
    );
    // check result
    if (result.data.status) {
      yield put(actions.deleteActivitySuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteActivityFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteActivityFailed(result.data));
  }
}
