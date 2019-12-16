import { takeLeading, put, select, call } from 'redux-saga/effects';

import sdk from 'gospel-sdk';
import uuid from 'uuid/v4';

import { CREATE_USER, CREATE_USER_REQUESTED } from './constants';
import { createRecord } from '../../common/gospelSaga';
import { dispatchSnackbar } from '../../common/snackbarSaga';

function* createUser({ email }) {
  try {
    const definition = yield select(
      state => state.credential.definitions.candidatesDefinition,
    );

    const record = sdk.getNewRecord(definition);
    record.id = email;
    record.fields = {
      emailAddress: email,
      UserID: `ID${uuid()}`,
    };

    yield call(createRecord, record, CREATE_USER);

    yield call(dispatchSnackbar, 'User created', 'success');
  } catch (e) {
    yield call(dispatchSnackbar, `User(s) could not be created: ${e}`, 'error');
    yield put({ type: 'CANDIDATE_FIRST_LOGIN', firstLogin: false });
  }
}

// Individual exports for testing
export default function* addUserSaga() {
  yield takeLeading(CREATE_USER_REQUESTED, createUser);
}
