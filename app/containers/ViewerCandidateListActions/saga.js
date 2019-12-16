import {
  takeLeading,
  takeEvery,
  all,
  call,
  select,
  put,
} from 'redux-saga/effects';
import uuid from 'uuid/v4';
import { RecordDefinition } from '@gospel/gospel-sdk-js';
import sdk from 'gospel-sdk';
import { createRecords } from '../../common/gospelSaga';
import {
  REQUEST_MORE_DETAILS,
  REQUEST_MORE_DETAILS_FAILURE,
  REQUEST_MORE_DETAILS_REQUESTED,
  REQUEST_MORE_DETAILS_SUCCEEDED,
} from './constants';
import { dispatchSnackbar } from '../../common/snackbarSaga';

function* requestMoreInfo({ instanceID }) {
  try {
    const selected = yield select(state => state.data[instanceID].selected);
    const records = yield select(state => state.data[instanceID].records);
    const definition = yield select(
      state => state.definitions.recordDefinitions.accessRequestsDefinition,
    );

    const definitionObj = new RecordDefinition(undefined, definition);

    const requestor = yield select(state => state.credential.username);
    const requestorUUID = yield select(state => state.credential.userUUID);

    const recordsSelected = records.filter((e, i) => selected.includes(i));
    const recs = recordsSelected.map(fields => {
      const requestRecord = sdk.getNewRecord(definitionObj);
      requestRecord.id = `ID${uuid()}`;
      requestRecord.fields = {
        UserID: fields.UserID,
        RequestorEmail: requestor,
        RequestorUserID: requestorUUID,
      };

      return requestRecord;
    });

    yield call(createRecords, recs, REQUEST_MORE_DETAILS);
  } catch (e) {
    yield put({ type: REQUEST_MORE_DETAILS_FAILURE, message: e.message });
    console.error(e);
  }
}

function* requestSucceeded() {
  yield call(dispatchSnackbar, 'Request(s) submitted successfully');
}

function* requestFailed({ message }) {
  const alreadyExists = message.includes(
    'There is already an existing request for user',
  );

  yield call(
    dispatchSnackbar,
    alreadyExists
      ? 'Information for one or more users were already requested'
      : 'Request(s) for more details failed',
    'error',
  );
}

export default function* sendRequest() {
  yield all([
    takeLeading(REQUEST_MORE_DETAILS_REQUESTED, requestMoreInfo),
    takeEvery(REQUEST_MORE_DETAILS_FAILURE, requestFailed),
    takeEvery(REQUEST_MORE_DETAILS_SUCCEEDED, requestSucceeded),
  ]);
}
