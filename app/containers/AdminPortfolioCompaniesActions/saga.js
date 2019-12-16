import { takeEvery, call, all, put } from 'redux-saga/effects';
import { dispatchSnackbar } from '../../common/snackbarSaga';
import { DATA_CLEAR_RECORDS, DATA_REQUESTED } from '../Data/constants';
import { POST_INFO_FAILED, POST_INFO_SUCCEEDED } from '../Form/constants';
import {
  COMPANY_ACCOUNTS_DELETE_SUCCEEDED,
  COMPANY_ACCOUNTS_DELETE_FAILED,
} from './constants';

function* deleteSuccess({ instanceID }) {
  yield call(
    dispatchSnackbar,
    'Portfolio Company Account(s) successfully deleted',
  );
  yield put({ type: DATA_CLEAR_RECORDS, instanceID });
  yield put({ type: DATA_REQUESTED, instanceID });
}

function* deleteFailure({ message }) {
  yield call(
    dispatchSnackbar,
    `Portfolio Company Account(s) could not be deleted: ${message}`,
    'error',
  );
}

function* viewerPostFailure({ message }) {
  yield call(
    dispatchSnackbar,
    `Portfolio Company Account(s) could not be created: ${message}`,
    'error',
  );
}

function* viewerCreated() {
  yield call(
    dispatchSnackbar,
    'Portfolio Company Account(s) successfully created',
  );
}

// Individual exports for testing
export default function* viewerAccessControlSaga() {
  yield all([
    takeEvery(COMPANY_ACCOUNTS_DELETE_FAILED, deleteFailure),
    takeEvery(COMPANY_ACCOUNTS_DELETE_SUCCEEDED, deleteSuccess),
    takeEvery(POST_INFO_SUCCEEDED, viewerCreated),
    takeEvery(POST_INFO_FAILED, viewerPostFailure),
  ]);
}
