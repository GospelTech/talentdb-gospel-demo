import { all, takeEvery, call } from 'redux-saga/effects';
import { dispatchSnackbar } from '../../common/snackbarSaga';
import {
  APPROVE_REQUESTS_FAILED,
  APPROVE_REQUESTS_SUCCEDED,
  REVOKE_REQUESTS_FAILED,
  REVOKE_REQUESTS_SUCCEDED,
} from './constants';

function* revokeSuccess() {
  yield call(dispatchSnackbar, 'Request(s) revoked successfully');
}

function* approveSuccess() {
  yield call(dispatchSnackbar, 'Request(s) approved successfully');
}

function* revokeFailure() {
  yield call(dispatchSnackbar, 'An error occured whilst revoking the request');
}

function* approveFailure() {
  yield call(dispatchSnackbar, 'An error occured whilst approving the request');
}

export default function* candidateActionsSaga() {
  yield all([
    takeEvery(APPROVE_REQUESTS_FAILED, approveFailure),
    takeEvery(REVOKE_REQUESTS_FAILED, revokeFailure),
    takeEvery(APPROVE_REQUESTS_SUCCEDED, approveSuccess),
    takeEvery(REVOKE_REQUESTS_SUCCEDED, revokeSuccess),
  ]);
}
