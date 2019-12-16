/*
 *
 * Form reducer
 *
 */
import produce from 'immer';
import {
  CLEAR_SENT,
  POST_INFO_FAILED,
  POST_INFO_REQUESTED,
  POST_INFO_SUCCEEDED,
  SELECT_DEFINITION,
} from './constants';

export const initialState = {
  sent: false,
  sending: false,
  definition: '',
};

/* eslint-disable default-case, no-param-reassign */
export const formInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_DEFINITION:
        draft.definition = action.definition;
        break;
      case POST_INFO_REQUESTED:
        draft.sending = true;
        break;
      case POST_INFO_SUCCEEDED:
        draft.sent = true;
      // falls through
      case POST_INFO_FAILED:
        draft.sending = false;
        break;
      case CLEAR_SENT:
        draft.sent = false;
        break;
    }
  });

export default formInfoReducer;
