import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add news
export function* addNews({ payload }) {
  try {
    yield put(actions.addNewsFetching());
    const result = yield call(httpClient.post, '/news-management/news', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addNewsSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addNewsFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addNewsFailed(result.data));
  }
}

// get news
export function* getNews({ payload }) {
  try {
    yield put(actions.getNewsFetching());
    const result = yield call(httpClient.get, payload ? `/news-management/news?search=${payload}` : '/news-management/news');
    // check result
    if (result.data.status) {
      yield put(actions.getNewsSuccess(result.data));
    } else {
      yield put(actions.getNewsFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getNewsFailed(result.data));
  }
}

// get news by id
export function* getNewsById({ payload }) {
  try {
    yield put(actions.getNewsByIdFetching());
    const result = yield call(httpClient.get, `/news-management/news/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.getNewsByIdSuccess(result.data));
    } else {
      yield put(actions.getNewsByIdFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getNewsByIdFailed(result.data));
  }
}

// update news
export function* updateNews({ payload }) {
  try {
    yield put(actions.updateNewsFetching());
    const result = yield call(httpClient.put, `/news-management/news/${payload.get('id')}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateNewsSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateNewsFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateNewsFailed(result.data));
  }
}

// delete news
export function* deleteNews({ payload }) {
  try {
    yield put(actions.deleteNewsFetching());
    const result = yield call(httpClient.delete, `/news-management/news/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteNewsSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteNewsFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteNewsFailed(result.data));
  }
}
