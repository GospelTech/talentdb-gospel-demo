import { take, put, actionChannel } from 'redux-saga/effects';
import {
  GET_DETAIL_REQUESTED,
  GET_DETAIL_FAILED,
  GET_DETAIL,
} from './constants';
import { getRecord, getViewRecord } from '../../common/gospelSaga';

// Individual exports for testing
export default function* rowDetailSaga() {
  const chan = yield actionChannel(GET_DETAIL_REQUESTED);
  while (true) {
    const { definition, id, fromView } = yield take(chan);
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
}
