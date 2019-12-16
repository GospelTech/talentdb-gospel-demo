import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addUser state domain
 */

const selectAddUserDomain = state => state.addUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddDialog
 */

const makeSelectAddUser = () =>
  createSelector(
    selectAddUserDomain,
    substate => substate,
  );

export default makeSelectAddUser;
export { selectAddUserDomain };
