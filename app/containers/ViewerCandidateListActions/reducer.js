/*
 *
 * ViewerCandidateListActions reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_MORE_DETAILS_REQUESTED,
  REQUEST_MORE_DETAILS_FAILURE,
  REQUEST_MORE_DETAILS_SUCCEEDED,
} from './constants';

export const initialState = {
  requesting: false,
};

/* eslint-disable default-case, no-param-reassign */
const viewerCandidateListActionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_MORE_DETAILS_REQUESTED:
        draft.requesting = true;
        break;
      case REQUEST_MORE_DETAILS_FAILURE:
      case REQUEST_MORE_DETAILS_SUCCEEDED:
        draft.requesting = false;
        break;
    }
  });

export default viewerCandidateListActionsReducer;
