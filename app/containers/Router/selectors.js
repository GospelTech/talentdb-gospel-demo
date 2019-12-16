import { createSelector } from 'reselect';

export const initialState = {
  groups: [],
};

/**
 * Direct selector to the router state domain
 */

const selectCredential = state => state.credential || initialState;

const selectGroup = createSelector(
  selectCredential,
  credential => credential.groups[0] || '',
);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Router
 */

const makeSelectCredential = () =>
  createSelector(
    selectCredential,
    substate => substate,
  );

export default makeSelectCredential;
export { selectCredential, selectGroup };
