import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobRelatedInfo state domain
 */

const selectJobRelatedInfoDomain = state =>
  state.jobRelatedInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobRelatedInfo
 */

const makeSelectJobRelatedInfo = () =>
  createSelector(
    selectJobRelatedInfoDomain,
    substate => substate,
  );

export default makeSelectJobRelatedInfo;
export { selectJobRelatedInfoDomain };
