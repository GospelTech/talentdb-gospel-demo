import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyInfo state domain
 */

const selectCompanyInfoDomain = state =>
  state.credential.companyInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompanyInfo
 */

const makeSelectCompanyInfo = () =>
  createSelector(
    selectCompanyInfoDomain,
    substate => substate,
  );

export default makeSelectCompanyInfo;
export { selectCompanyInfoDomain };
