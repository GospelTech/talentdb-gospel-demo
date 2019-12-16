/*
 *
 * Join constants
 *
 */

export const UPSERT_USER_INFO_REQUESTED = 'app/Join/UPSERT_USER_INFO_REQUESTED';
export const UPSERT_USER_INFO_SUCCEDED = 'app/Join/UPSERT_USER_INFO_SUCCEDED';
export const UPSERT_USER_INFO_FAILED = 'app/Join/UPSERT_USER_INFO_FAILED';
export const UPSERT_USER_INFO = {
  success: UPSERT_USER_INFO_SUCCEDED,
  failure: UPSERT_USER_INFO_FAILED,
  request: UPSERT_USER_INFO_REQUESTED,
};
