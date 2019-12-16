/*
 *
 * CandidateTable actions
 *
 */

import { REQUEST_MORE_DETAILS_REQUESTED } from './constants';

export function sendRequest(instanceID) {
  return {
    type: REQUEST_MORE_DETAILS_REQUESTED,
    instanceID,
  };
}
