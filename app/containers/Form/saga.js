// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLeading } from 'redux-saga/effects';

import sdk from 'gospel-sdk';
import uuid from 'uuid/v4';

import { pick } from 'lodash';
import { all } from '@redux-saga/core/effects';
import moment from 'moment';
import {
  POST_INFO,
  POST_INFO_FAILED,
  POST_INFO_REQUESTED,
  POST_INFO_SUCCEEDED,
} from './constants';
import { alterRecord, createRecord } from '../../common/gospelSaga';
import { RecordDefinition } from '../../../node_modules/@gospel/gospel-sdk-js/dist/model/record-definition';
import { dispatchSnackbar } from '../../common/snackbarSaga';

function* upsertRecord({ update, fields, definition }) {
  try {
    const record = sdk.getNewRecord(
      RecordDefinition.transformFromObject(definition),
    );

    record.fields = pick(
      fields,
      definition.fields.filter(f => f.type !== 'blob').map(f => f.name),
    );

    record.fields = objectMap(record.fields, mapFn());

    record.id = fields.id ? fields.id : `ID${uuid()}`;

    if (update) {
      yield alterRecord(record, POST_INFO);
    } else {
      yield createRecord(record, POST_INFO);
    }
  } catch (e) {
    yield put({ type: POST_INFO_FAILED, message: e.message });
  }
}

function* callSnackbar() {
  yield call(dispatchSnackbar, `Your record(s) have been updated`, 'success');
}

function mapFn(value) {
  return value instanceof Date ? moment(value).unix() : value;
}

// returns a new object with the values at each key mapped using mapFn(value)
function objectMap(object) {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: mapFn(object[key]) }),
    {},
  );
}

// Individual exports for testing
export default function* formSaga() {
  yield all([
    takeLeading(POST_INFO_SUCCEEDED, callSnackbar),
    takeLeading(POST_INFO_REQUESTED, upsertRecord),
  ]);
}
