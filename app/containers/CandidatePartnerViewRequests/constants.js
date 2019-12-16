/*
 *
 * CandidatePartnerViewRequests constants
 *
 */

export const APPROVE_REQUESTS_REQUESTED =
  'app/CandidatePartnerViewRequests/APPROVE_REQUESTS_REQUESTED';
export const APPROVE_REQUESTS_SUCCEDED =
  'app/CandidatePartnerViewRequests/APPROVE_REQUESTS_SUCCEDED';
export const APPROVE_REQUESTS_FAILED =
  'app/CandidatePartnerViewRequests/APPROVE_REQUESTS_FAILED';
export const APPROVE_REQUESTS = {
  success: APPROVE_REQUESTS_SUCCEDED,
  failure: APPROVE_REQUESTS_FAILED,
  request: APPROVE_REQUESTS_REQUESTED,
};

export const REVOKE_REQUESTS_REQUESTED =
  'app/CandidatePartnerViewRequests/REVOKE_REQUESTS_REQUESTED';
export const REVOKE_REQUESTS_SUCCEDED =
  'app/CandidatePartnerViewRequests/REVOKE_REQUESTS_SUCCEDED';
export const REVOKE_REQUESTS_FAILED =
  'app/CandidatePartnerViewRequests/REVOKE_REQUESTS_FAILED';
export const REVOKE_REQUESTS = {
  success: REVOKE_REQUESTS_SUCCEDED,
  failure: REVOKE_REQUESTS_FAILED,
  request: APPROVE_REQUESTS_REQUESTED,
};
