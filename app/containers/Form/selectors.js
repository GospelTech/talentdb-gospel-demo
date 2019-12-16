import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the form state domain
 */

const selectFormDomain = state => state.formInfo || initialState;
const selectDefinitionsDomain = state =>
  state.definitions.recordDefinitions || initialState;
const selectDefinitionNameDomain = state =>
  selectFormDomain(state).definition || initialState;
const selectInitialState = formInfo => formInfo.initialState || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Form
 */

export const makeSelectForm = () =>
  createSelector(
    selectFormDomain,
    substate => substate,
  );

export const makeSelectSending = () =>
  createSelector(
    selectFormDomain,
    formInfo => formInfo.sending,
  );

export const makeSelectSent = () =>
  createSelector(
    selectFormDomain,
    formInfo => formInfo.sent,
  );

export const makeSelectData = () =>
  createSelector(
    selectDefinitionNameDomain,
    selectDefinitionsDomain,
    (name, definitions) => definitions[name] || { fields: [] },
  );

export const makeSelectInitialState = () =>
  createSelector(
    selectFormDomain,
    selectInitialState,
  );

export default makeSelectForm;
