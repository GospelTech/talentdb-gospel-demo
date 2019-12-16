import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidatesListActions state domain
 */

const selectAdminCandidatesListActionsDomain = state =>
  state.adminCandidatesListActions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidatesListActions
 */

const makeSelectAdminCandidatesListActions = () =>
  createSelector(
    selectAdminCandidatesListActionsDomain,
    substate => substate,
  );

export default makeSelectAdminCandidatesListActions;
export { selectAdminCandidatesListActionsDomain };
