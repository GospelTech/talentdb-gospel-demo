import { takeEvery, call, all, select, put } from 'redux-saga/effects';
import config from 'config';
import { dispatchSnackbar } from '../../common/snackbarSaga';
import { deleteRecords } from '../../common/gospelSaga';
import {
  DATA_CLEAR_RECORDS,
  DATA_REQUESTED,
  DATA_DELETE_SUCCEDED,
} from '../Data/constants';

import {
  ACCOUNTS_DELETE_REQUESTED,
  ACCOUNTS_DELETE_SUCCEEDED,
  ACCOUNTS_DELETE_FAILED,
  ACCOUNTS_DELETE,
} from './constants';

function* deleteSuccess() {
  yield call(dispatchSnackbar, 'Account(s) successfully deleted');
}

function* deleteFailure({ message }) {
  yield call(
    dispatchSnackbar,
    `Account(s) could not be deleted: ${message}`,
    'error',
  );
}

function* deleteAccounts({ instanceID, selectedIds }) {
  try {
    const records = yield select(state => state.data[instanceID].records);
    const toBeDeleted = records
      .filter(record => selectedIds.includes(record.Id))
      .reduce(
        (acc, record) => [
          ...acc,
          {
            definition: config.recordDefinitions.talentsDataDefinition,
            id: record.Id,
          },
          {
            definition: config.recordDefinitions.piiDataDefinition,
            id: record.Id,
          },
          {
            definition: config.recordDefinitions.candidatesDefinition,
            id: record['Email address'],
          },
        ],
        [],
      );
    yield call(deleteRecords, toBeDeleted, ACCOUNTS_DELETE);
    yield put({ type: DATA_DELETE_SUCCEDED, instanceID });
    yield put({ type: DATA_CLEAR_RECORDS, instanceID });
    yield put({ type: DATA_REQUESTED, instanceID });
  } catch (e) {
    yield put({
      type: ACCOUNTS_DELETE_FAILED,
      instanceID,
      message: e.message,
    });
  }
}

// Individual exports for testing
export default function* adminCandidatesListActions() {
  yield all([
    takeEvery(ACCOUNTS_DELETE_REQUESTED, deleteAccounts),
    takeEvery(ACCOUNTS_DELETE_FAILED, deleteFailure),
    takeEvery(ACCOUNTS_DELETE_SUCCEEDED, deleteSuccess),
  ]);
}
