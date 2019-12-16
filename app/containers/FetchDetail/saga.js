import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_DETAIL_REQUESTED,
  GET_DETAIL_FAILED,
  GET_DETAIL,
} from './constants';
import {
  getFirstRecord,
  getRecord,
  getViewFirstRecord,
  getViewRecord,
} from '../../common/gospelSaga';

export function* selectSaga({ definition, id, fromView, search }) {
  if (search) {
    yield call(searchDetails, definition, id, fromView, search);
  } else {
    yield call(fetchDetails, definition, id, fromView);
  }
}

export function* searchDetails(definition, id, fromView, search) {
  try {
    if (fromView) {
      yield getViewFirstRecord(definition, id, search, GET_DETAIL);
    } else {
      yield getFirstRecord(definition, id, search, GET_DETAIL);
    }
  } catch (e) {
    yield put({ type: GET_DETAIL_FAILED, message: e.message });
  }
}

export function* fetchDetails(definition, id, fromView) {
  try {
    if (fromView) {
      yield getViewRecord(definition, id, GET_DETAIL);
    } else {
      yield getRecord(definition, id, GET_DETAIL);
    }
  } catch (e) {
    yield put({ type: GET_DETAIL_FAILED, message: e.message });
  }
}

export default function* rowDetailSaga() {
  yield takeEvery(GET_DETAIL_REQUESTED, selectSaga);
}
