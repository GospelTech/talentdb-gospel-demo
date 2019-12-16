/*
 *
 * AdminCandidatesListActions actions
 *
 */

import { ACCOUNTS_DELETE_REQUESTED } from './constants';

export function deleteUsers(instanceID, selectedIds) {
  return {
    type: ACCOUNTS_DELETE_REQUESTED,
    selectedIds,
    instanceID,
  };
}
