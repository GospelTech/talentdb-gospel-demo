// Individual exports for testing
import {
  actionChannel,
  call,
  put,
  select,
  take,
} from '@redux-saga/core/effects';
import config from 'config';
import {
  ACCOUNT_DELETE_REQUESTED,
  ACCOUNT_DELETE_FAILED,
  ACCOUNT_DELETE_SUCCEEDED,
} from './constants';
import { deleteRecords } from '../../common/gospelSaga';

export default function* accountSaga() {
  const chan = yield actionChannel(ACCOUNT_DELETE_REQUESTED);

  while (true) {
    try {
      let { userUUID } = yield take(chan);
      if (!userUUID) {
        userUUID = yield select(state => state.credential.userUUID);
      }

      const definitions = [
        {
          definition: config.recordDefinitions.talentsDataDefinition,
          id: userUUID,
        },
        {
          definition: config.recordDefinitions.piiDataDefinition,
          id: userUUID,
        },
        {
          definition: config.recordDefinitions.candidatesDefinition,
          id: yield select(state => state.credential.username),
        },
      ];

      yield call(deleteRecords, definitions);
      yield put({ type: ACCOUNT_DELETE_SUCCEEDED });
    } catch (e) {
      yield put({
        type: ACCOUNT_DELETE_FAILED,
        deleting: false,
        message: e.message,
      });
    }
  }
}
