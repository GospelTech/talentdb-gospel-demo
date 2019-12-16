import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rowDetail state domain
 */

const selectFetchDetailDomain = state => state.fetchDetail || {};

/**
 * Other specific selectors
 */
const makeSelectFetchDetail = () =>
  createSelector(
    selectFetchDetailDomain,
    substate => substate || {},
    // fetchDetail => fetchDetail[definition] || {},
  );

export default makeSelectFetchDetail;
export { selectFetchDetailDomain };
