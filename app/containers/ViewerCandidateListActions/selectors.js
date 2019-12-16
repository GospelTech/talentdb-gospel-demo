import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewerCandidateListActions state domain
 */

const selectViewerCandidateListActionsDomain = state =>
  state.viewerCandidateListActions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewerCandidateListActions
 */

const makeSelectViewerCandidateListActionsRequesting = () =>
  createSelector(
    selectViewerCandidateListActionsDomain,
    substate => substate.requesting,
  );

export default makeSelectViewerCandidateListActionsRequesting;
export { selectViewerCandidateListActionsDomain };
