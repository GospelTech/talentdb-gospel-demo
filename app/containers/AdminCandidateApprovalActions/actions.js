/*
 *
 * CandidatePartnerViewRequests actions
 *
 */
import { REVOKE_REQUESTS, APPROVE_REQUESTS } from './constants';
import { DATA_CHANGE_REQUESTED } from '../Data/constants';

export function revokeRequests(instanceID) {
  return {
    type: DATA_CHANGE_REQUESTED,
    instanceID,
    definition: 'candidatesDefinition',
    fields: {
      'Approved account': false,
    },
    actionType: REVOKE_REQUESTS,
  };
}

export function approveRequests(instanceID) {
  return {
    type: DATA_CHANGE_REQUESTED,
    instanceID,
    definition: 'candidatesDefinition',
    fields: {
      'Approved account': true,
    },
    actionType: APPROVE_REQUESTS,
  };
}
