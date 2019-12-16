import { actionChannel, take, call, put, select } from 'redux-saga/effects';
import config from 'config';
import {
  ACCOUNT_DELETE_REQUESTED,
  ACCOUNT_DELETE_FAILED,
  ACCOUNT_DELETE_SUCCEEDED,
} from '../Account/constants';
import { deleteRecords } from '../../common/gospelSaga';

export default function* companyInfoSaga() {
  const chan = yield actionChannel(ACCOUNT_DELETE_REQUESTED);

  while (true) {
    yield take(chan);
    try {
      const userUUID = yield select(state => state.credential.userUUID);

      const definitions = [
        {
          definition: config.recordDefinitions.viewersDefinition,
          id: userUUID,
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
