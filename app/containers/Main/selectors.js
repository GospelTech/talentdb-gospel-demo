import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the main state domain
 */

const selectMainDomain = state => state || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const makeSelectMain = () =>
  createSelector(
    selectMainDomain,
    substate => substate,
  );

export default makeSelectMain;
export { selectMainDomain };
