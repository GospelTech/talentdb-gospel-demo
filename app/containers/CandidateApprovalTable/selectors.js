import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateApprovalTable state domain
 */

const selectCandidateApprovalTableDomain = state =>
  state.candidateApprovalTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidateApprovalTable
 */

const makeSelectCandidateApprovalTable = () =>
  createSelector(
    selectCandidateApprovalTableDomain,
    substate => substate,
  );

export default makeSelectCandidateApprovalTable;
export { selectCandidateApprovalTableDomain };
