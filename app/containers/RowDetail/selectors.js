import { createSelector } from 'reselect';

/**
 * Direct selector to the rowDetail state domain
 */

const selectRowDetailDomain = state => state.rowDetail || {};

/**
 * Other specific selectors
 */
const makeSelectRowDetail = () =>
  createSelector(
    selectRowDetailDomain,
    substate => substate,
  );

export default makeSelectRowDetail;
export { selectRowDetailDomain };
