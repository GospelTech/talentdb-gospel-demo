/*
 *
 * CandidatePartnerViewRequests reducer
 *
 */
import produce from 'immer';
import {
  APPROVE_REQUESTS_FAILED,
  APPROVE_REQUESTS_REQUESTED,
  APPROVE_REQUESTS_SUCCEDED,
  REVOKE_REQUESTS_FAILED,
  REVOKE_REQUESTS_REQUESTED,
  REVOKE_REQUESTS_SUCCEDED,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const candidateActionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case APPROVE_REQUESTS_REQUESTED:
      case REVOKE_REQUESTS_REQUESTED:
        // draft.requesting = true;
        break;
      case APPROVE_REQUESTS_SUCCEDED:
      case REVOKE_REQUESTS_SUCCEDED:
      case APPROVE_REQUESTS_FAILED:
      case REVOKE_REQUESTS_FAILED:
      // draft.requesting = false;
    }
  });

export default candidateActionsReducer;
