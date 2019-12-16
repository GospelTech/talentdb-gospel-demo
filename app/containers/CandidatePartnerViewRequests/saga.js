import { all, takeEvery, call } from 'redux-saga/effects';
import { dispatchSnackbar } from '../../common/snackbarSaga';
import {
  APPROVE_REQUESTS_FAILED,
  APPROVE_REQUESTS_SUCCEDED,
  REVOKE_REQUESTS_FAILED,
  REVOKE_REQUESTS_SUCCEDED,
} from './constants';

function* revokeSuccess() {
  yield call(dispatchSnackbar, 'View Request(s) revoked successfully');
}

function* approveSuccess() {
  yield call(dispatchSnackbar, 'View Request(s) approved successfully');
}

function* revokeFailure({ message }) {
  yield call(
    dispatchSnackbar,
    `View Request(s) revoked was unsuccessful: ${message}`,
    'error',
  );
}

function* approveFailure({ message }) {
  yield call(
    dispatchSnackbar,
    `View Request(s) approved was unsuccessful: ${message}`,
    'error',
  );
}

export default function* candidateActionsSaga() {
  yield all([
    takeEvery(APPROVE_REQUESTS_FAILED, approveFailure),
    takeEvery(REVOKE_REQUESTS_FAILED, revokeFailure),
    takeEvery(APPROVE_REQUESTS_SUCCEDED, approveSuccess),
    takeEvery(REVOKE_REQUESTS_SUCCEDED, revokeSuccess),
  ]);
}
