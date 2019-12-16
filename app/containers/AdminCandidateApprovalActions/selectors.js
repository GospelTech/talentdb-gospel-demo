import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateActions state domain
 */

const selectCandidateActionsDomain = state =>
  state.candidateActions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePartnerViewRequests
 */

const makeSelectCandidateActions = () =>
  createSelector(
    selectCandidateActionsDomain,
    substate => substate,
  );

// export default makeSelectCandidateActions;
// export { selectCandidateActionsDomain };
