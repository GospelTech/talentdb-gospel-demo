import { takeLeading, call, put, select } from 'redux-saga/effects';

import sdk from 'gospel-sdk';
import { RecordDefinition } from '@gospel/gospel-sdk-js/dist/model/record-definition';

import {
  UPSERT_USER_INFO,
  UPSERT_USER_INFO_FAILED,
  UPSERT_USER_INFO_REQUESTED,
  UPSERT_USER_INFO_SUCCEDED,
} from './constants';

import { alterRecords, createRecords } from '../../common/gospelSaga';
import { dispatchSnackbar } from '../../common/snackbarSaga';

const pick = (o, props) =>
  Object.assign(
    {},
    ...props.map(prop =>
      typeof o[prop] !== 'undefined' ? { [prop]: o[prop] } : {},
    ),
  );

function* upsertUserInfo({ info, update = false }) {
  try {
    const talentDefinition = yield select(
      state => state.definitions.recordDefinitions.talentsDataDefinition,
    );
    const piiDefinition = yield select(
      state => state.definitions.recordDefinitions.piiDataDefinition,
    );

    const talentRecord = sdk.getNewRecord(
      RecordDefinition.transformFromObject(talentDefinition),
    );
    const piiRecord = sdk.getNewRecord(
      RecordDefinition.transformFromObject(piiDefinition),
    );

    talentRecord.fields = pick(info, talentDefinition.fields.map(f => f.name));
    piiRecord.fields = pick(info, piiDefinition.fields.map(f => f.name));

    if (update) {
      yield alterRecords(talentRecord, piiRecord);
    } else {
      talentRecord.id = yield select(state => state.credential.userUUID);
      talentRecord.fields.UserID = talentRecord.id;
      piiRecord.id = talentRecord.id;
      piiRecord.fields.UserID = talentRecord.id;
      yield createRecords([talentRecord, piiRecord]);
      yield put({
        type: 'CANDIDATE_INFO',
        candidateInfo: {
          id: piiRecord.id,
          ...talentRecord.fields,
          ...piiRecord.fields,
        },
      });
      yield put({ type: 'CANDIDATE_FIRST_LOGIN', firstLogin: false });
    }
    yield put({ type: UPSERT_USER_INFO_SUCCEDED });
    yield call(dispatchSnackbar, `Account(s) has been created`, 'success');
  } catch (e) {
    yield call(
      dispatchSnackbar,
      `Account(s) could not be created: ${e}`,
      'error',
    );
    yield put({ type: UPSERT_USER_INFO_FAILED });
  }
}

export default function* joinSaga() {
  yield takeLeading(UPSERT_USER_INFO_REQUESTED, upsertUserInfo);
}
