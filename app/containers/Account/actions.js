/*
 *
 * Account actions
 *
 */

import { ACCOUNT_DELETE_REQUESTED } from './constants';

export function deleteData() {
  return {
    type: ACCOUNT_DELETE_REQUESTED,
    deleting: true,
  };
}
