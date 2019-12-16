import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the join state domain
 */

const selectJoinDomain = state => state.join || initialState;
const selectCredentials = state => state.credential || initialState;
// TODO move definitions somewhere else, porcoddio
const selectDefinitions = state => state.credential.definitions || initialState;

const selectPIIDefinition = state =>
  state.definitions.recordDefinitions.piiDataDefinition;
const selectTalentsDefinition = state =>
  state.definitions.recordDefinitions.talentsDataDefinition;
export const selectUserName = state => state.credential.username;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Join
 */

const makeSelectJoin = () =>
  createSelector(
    selectJoinDomain,
    substate => substate,
  );

const makeSelectDefinition = () =>
  createSelector(
    selectPIIDefinition,
    selectTalentsDefinition,
    (pii, talents) => ({ pii, talents }),
  );

const makeSelectUsername = () => createSelector(selectUserName);

export default makeSelectJoin;
export { selectJoinDomain, makeSelectDefinition };
