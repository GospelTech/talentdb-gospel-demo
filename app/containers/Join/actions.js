/*
 *
 * Join actions
 *
 */

import { UPSERT_USER_INFO_REQUESTED } from './constants';

export function upsertUserInfo(info, update) {
  return {
    type: UPSERT_USER_INFO_REQUESTED,
    info,
    update,
  };
}
