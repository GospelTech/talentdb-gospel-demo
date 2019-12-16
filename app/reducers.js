/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import notistack from 'containers/Notifier/reducer';
import { ACCOUNT_DELETE_SUCCEEDED } from './containers/Account/constants';

const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER_INFO':
      return {
        ...state,
        ...action.data,
      };
    case 'CANDIDATE_FIRST_LOGIN':
      return {
        ...state,
        firstLogin: action.firstLogin,
      };
    case 'CANDIDATE_INFO':
      return {
        ...state,
        candidateInfo: action.candidateInfo,
      };
    case 'COMPANY_INFO':
      return {
        ...state,
        companyInfo: action.companyInfo,
      };
    case ACCOUNT_DELETE_SUCCEEDED:
      return {
        ...state,
        accountDeleted: true,
      };
    default:
      return state;
  }
};

const definitionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_DEFINITIONS_DATA':
      return {
        ...state,
        recordDefinitions: action.recordDefinitions,
        viewDefinitions: action.viewDefinitions,
      };
    default:
      return state;
  }
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    form: formReducer,
    credential: userInfoReducer,
    definitions: definitionsReducer,
    notistack,
    ...injectedReducers,
  });

  return rootReducer;
}
