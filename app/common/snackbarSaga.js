import { put } from 'redux-saga/effects';
import {
  ENQUEUE_SNACKBAR,
  enqueueSnackbar,
} from '../containers/Notifier/actions';

export function* dispatchSnackbar(message, variant = 'success') {
  yield put(
    enqueueSnackbar({
      type: ENQUEUE_SNACKBAR,
      message,
      options: {
        key: new Date().getTime() + Math.random(),
        variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
    }),
  );
}
