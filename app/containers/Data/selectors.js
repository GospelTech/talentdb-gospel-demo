import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the data state domain
 */

export const makeSelectData = props => state =>
  (state.data || {})[props.instanceID] || initialState;

export const makeSelectRecords = props =>
  createSelector(
    makeSelectData(props),
    state => state.records || [],
  );

// export const makeSelectRecords = props => state =>
//  .records || [];

export const selectDataDomain = state => state.data || initialState;

export const makeSelectDataSelected = props =>
  createSelector(
    makeSelectData(props),
    data => data.selected || [],
  );

export const makeSelectDataDeleting = props =>
  createSelector(
    makeSelectData(props),
    data => data.deleting || false,
  );

export const makeSelectDataAltering = props =>
  createSelector(
    makeSelectData(props),
    data => data.altering || false,
  );

export const makeSelectDataSelectedLength = props =>
  createSelector(
    makeSelectDataSelected(props),
    selected => selected.length || 0,
  );

/**
 * Other specific selectors
 */

/**
 * Default selector used by Data
 */

export const makeSelectDataSelectedRecords = props =>
  createSelector(
    makeSelectRecords(props),
    makeSelectDataSelected(props),
    (records, selected) =>
      records.filter((e, i) => selected.includes(i)).map(r => r.Id),
  );
