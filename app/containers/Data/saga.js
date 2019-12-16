import {
  actionChannel,
  call,
  take,
  put,
  select,
  takeEvery,
  all,
} from 'redux-saga/effects';
import { RecordDefinition } from '@gospel/gospel-sdk-js';
import { pick } from 'lodash';
import sdk from 'gospel-sdk';
import { alterRecords, deleteRecords, getPage } from '../../common/gospelSaga';
import {
  DATA_CHANGE_FAILED,
  DATA_CHANGE_REQUESTED,
  DATA_CHANGE_SUCCEDED,
  DATA_CLEAR_RECORDS,
  DATA_DELETE_FAILED,
  DATA_DELETE_REQUESTED,
  DATA_DELETE_SUCCEDED,
  DATA_FAILED,
  DATA_REQUESTED,
  GET,
} from './constants';
import { makeSelectData } from './selectors';
import { dispatchSnackbar } from '../../common/snackbarSaga';

export function* dataSaga() {
  function* fn({ instanceID }) {
    const { page, filter, fields, isView, definition } = yield select(
      makeSelectData({ instanceID }),
    );

    try {
      yield call(
        getPage,
        definition,
        page,
        filter,
        fields,
        GET,
        isView,
        instanceID,
      );
    } catch (e) {
      console.error(e);
    }
  }

  yield all([
    takeEvery(DATA_REQUESTED, fn),
    takeEvery(DATA_FAILED, retrieveFailed),
  ]);
}

export function* dataDeleteSaga() {
  const chan = yield actionChannel(DATA_DELETE_REQUESTED);
  while (true) {
    const { instanceID, definition, selected, actionType } = yield take(chan);

    try {
      yield call(
        deleteRecords,
        selected.map(id => ({ definition, id })),
        actionType,
        { instanceID },
      );
      yield put({ type: DATA_DELETE_SUCCEDED, instanceID, deleting: false });
    } catch (e) {
      yield put({
        type: DATA_DELETE_FAILED,
        deleting: false,
        message: e.message,
        instanceID,
      });
    }
  }
}

function* dataChangeSagaFn(instanceID, definition, fields, actionType) {
  try {
    const definitionObj = yield select(
      state => state.definitions.recordDefinitions[definition],
    );
    const selected = yield select(state => state.data[instanceID].selected);
    const records = yield select(state => state.data[instanceID].records);

    const recordObjs = records
      .filter((_, i) => selected.includes(i))
      .map(r => {
        const record = sdk.getNewRecord(
          RecordDefinition.transformFromObject(definitionObj),
        );
        record.fields = pick(r, definitionObj.fields.map(f => f.name));
        record.fields = { ...record.fields, ...fields };
        record.id = r.Id;

        return record;
      });

    yield alterRecords(recordObjs, actionType);
    yield put({ type: DATA_CHANGE_SUCCEDED, instanceID });
    yield put({ type: DATA_CLEAR_RECORDS, instanceID });
    yield put({ type: DATA_REQUESTED, instanceID });
  } catch (e) {
    yield put({ type: DATA_CHANGE_FAILED, instanceID });
    console.error(e);
  }
}

export function* dataChangeSaga() {
  const chan = yield actionChannel(DATA_CHANGE_REQUESTED);

  while (true) {
    const { instanceID, definition, fields, actionType } = yield take(chan);

    yield dataChangeSagaFn(instanceID, definition, fields, actionType);
  }
}

function* retrieveFailed() {
  yield call(
    dispatchSnackbar,
    'Cannot retrieve info at the moment, try again later',
    'error',
  );
}
