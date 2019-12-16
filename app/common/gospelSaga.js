import { call, put, select, all } from 'redux-saga/effects';
import sdk from 'gospel-sdk';
import config from 'config';
import { RecordDefinition, ViewDefinition } from '@gospel/gospel-sdk-js';

// dirty hack
const paginators = {
  recordDefinitions: {},
  viewDefinitions: {},
};

const selectDefinition = (type, definition) => state =>
  state.definitions[type][definition];

export function* getPage(
  definition,
  page,
  search,
  fields,
  actionType,
  isView = false,
  instanceID,
) {
  try {
    const type = isView ? 'viewDefinitions' : 'recordDefinitions';
    const definitionName = config[type][definition];
    if (
      !Object.hasOwnProperty.call(paginators[type], definitionName) ||
      page === 0
    ) {
      const definitionObj = yield select(selectDefinition(type, definition));
      if (isView) {
        paginators[type][definitionName] = sdk.getViewRecords(
          definitionName,
          search,
          undefined,
          ViewDefinition.transformFromObject(
            definitionObj,
            undefined,
            RecordDefinition.transformFromObject(definitionObj),
          ),
        );
      } else {
        paginators[type][definitionName] = sdk.getRecordsByType(
          definitionName,
          search,
          undefined,
          undefined,
          RecordDefinition.transformFromObject(definitionObj),
        );
      }
    }
    const paginator = paginators[type][definitionName];
    const records = yield call([paginator, paginator.page], page);

    yield put({
      type: actionType.success,
      instanceID,
      data: {
        records: records.map(v => ({ ...v.fields, Id: v.id })),
      },
    });
  } catch (e) {
    yield handleFailure(e, actionType, { instanceID });
  }
}

export function* createRecord(record, actionType) {
  try {
    yield call([sdk, sdk.createRecord], record);
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* createRecords(records, actionType) {
  try {
    yield all(records.map(record => createRecord(record)));
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* alterRecord(record, actionType) {
  try {
    yield call([sdk, sdk.updateRecord], record);
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* alterRecords(records, actionType) {
  try {
    yield all(records.map(record => alterRecord(record)));
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* deleteRecord(definition, id, actionType) {
  try {
    yield call([sdk, sdk.deleteRecordByTypeAndId], definition, id);
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* deleteRecords(records, actionType, params) {
  try {
    yield all(
      records.map(record => deleteRecord(record.definition, record.id)),
    );
    if (typeof actionType !== 'undefined') {
      yield put({ type: actionType.success, ...params });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* getRecord(definition, id, actionType) {
  try {
    // TODO: this should take an arbitrary definition. if there's no cache
    // we could still fetch a Record
    const definitionObj = new RecordDefinition(
      undefined,
      yield select(state => state.definitions.recordDefinitions[definition]),
    );

    const record = yield call(
      [sdk, sdk.getRecordByTypeAndId],
      definition,
      id,
      definitionObj,
    );

    yield put({
      type: actionType.success,
      fields: record.fields,
      id: record.id,
      definition,
    });
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* getViewRecord(definition, id, actionType) {
  try {
    // TODO: this should take an arbitrary definition. if there's no cache
    // we could still fetch a Record
    const definitionObj = new ViewDefinition(
      undefined,
      new RecordDefinition(
        undefined,
        yield select(state => state.definitions.viewDefinitions[definition]),
      ),
      yield select(state => state.definitions.viewDefinitions[definition]),
    );

    const record = yield call(
      [sdk, sdk.getViewRecordById],
      definition,
      id,
      definitionObj,
    );

    yield put({
      type: actionType.success,
      fields: record.fields,
      id: record.id,
      definition,
    });
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* getFirstRecord(definition, id, search, actionType) {
  try {
    // TODO: this should take an arbitrary definition. if there's no cache
    // we could still fetch a Record
    const definitionObj = new RecordDefinition(
      undefined,
      yield select(state => state.definitions.recordDefinitions[definition]),
    );

    const paginator = sdk.getRecordsByType(
      config.recordDefinitions[definition],
      search,
      1,
      undefined,
      RecordDefinition.transformFromObject(definitionObj),
    );

    const recordList = yield paginator.next();

    if (recordList.length !== 1) {
      yield put({
        type: actionType.success,
        fields: undefined,
        id,
        definition,
      });
    } else {
      const [record] = recordList;

      yield put({
        type: actionType.success,
        fields: record.fields,
        id,
        definition,
      });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

export function* getViewFirstRecord(definition, id, search, actionType) {
  try {
    // TODO: this should take an arbitrary definition. if there's no cache
    // we could still fetch a Record
    const definitionObj = new RecordDefinition(
      undefined,
      yield select(state => state.definitions.recordDefinitions[definition]),
    );

    const paginator = sdk.getViewRecords(
      config.viewDefinitions[definition],
      search,
      undefined,
      ViewDefinition.transformFromObject(
        definitionObj,
        undefined,
        RecordDefinition.transformFromObject(definitionObj),
      ),
    );

    const recordList = yield paginator.next();

    if (recordList.length !== 1) {
      yield put({
        type: actionType.success,
        fields: undefined,
        id,
        definition,
      });
    } else {
      const [record] = recordList;

      yield put({
        type: actionType.success,
        fields: record.fields,
        id,
        definition,
      });
    }
  } catch (e) {
    yield handleFailure(e, actionType);
  }
}

function* handleFailure(e, actionType, params = {}) {
  if (typeof actionType !== 'undefined') {
    yield put({ type: actionType.failure, message: e.message, ...params });
  } else {
    throw e;
  }
}
