/*
 *
 * CandidateAccessControl reducer
 *
 */
import produce from 'immer';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const adminCandidatesListActionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default viewerAccessControlReducer;
