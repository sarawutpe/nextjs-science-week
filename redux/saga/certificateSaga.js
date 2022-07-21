import Router from 'next/router';
import { put, call, delay } from 'redux-saga/effects';
import actions from '../actions';
import httpClient, { NETWORK_DELAY } from '../../services/httpClient';

// add certificate
export function* addCertificate({ payload }) {
  try {
    yield put(actions.addCertificateFetching());
    const result = yield call(httpClient.post, '/certificate-management/certificate', payload);
    // check result
    if (result.data.status) {
      yield put(actions.addCertificateSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.addCertificateFailed(result.data));
    }
  } catch (error) {
    yield put(actions.addCertificateFailed(result.data));
  }
}

// get certificate
export function* getCertificate({ payload }) {
  try {
    yield put(actions.getCertificateFetching());
    const result = yield call(httpClient.get, payload ? `/certificate-management/certificate?search=${payload}` : '/certificate-management/certificate');
    // check result
    if (result.data.status) {
      yield put(actions.getCertificateSuccess(result.data));
    } else {
      yield put(actions.getCertificateFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCertificateFailed(result.data));
  }
}

// get certificate by id
export function* getCertificateByType({ payload }) {
  try {
    yield put(actions.getCertificateByTypeFetching());
    const result = yield call(httpClient.get, `/certificate-management/certificate/type`);
    // check result
    if (result.data.status) {
      yield put(actions.getCertificateByTypeSuccess(result.data));
    } else {
      yield put(actions.getCertificateByTypeFailed(result.data));
    }
  } catch (error) {
    yield put(actions.getCertificateByTypeFailed(result.data));
  }
}

// update certificate
export function* updateCertificate({ payload }) {
  try {
    yield put(actions.updateCertificateFetching());
    const result = yield call(httpClient.put, `/certificate-management/certificate/${payload.get('id')}`, payload);
    // check result
    if (result.data.status) {
      yield put(actions.updateCertificateSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.updateCertificateFailed(result.data));
    }
  } catch (error) {
    yield put(actions.updateCertificateFailed(result.data));
  }
}

// delete certificate
export function* deleteCertificate({ payload }) {
  try {
    yield put(actions.deleteCertificateFetching());
    const result = yield call(httpClient.delete, `certificate-management/certificate/${payload}`);
    // check result
    if (result.data.status) {
      yield put(actions.deleteCertificateSuccess(result.data));
      Router.push(Router.pathname);
    } else {
      yield put(actions.deleteCertificateFailed(result.data));
    }
  } catch (error) {
    yield put(actions.deleteCertificateFailed(result.data));
  }
}
