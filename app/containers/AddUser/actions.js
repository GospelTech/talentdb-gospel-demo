/*
 *
 * AddDialog actions
 *
 */

import { CREATE_USER_REQUESTED } from './constants';

export function createUser(email) {
  return {
    type: CREATE_USER_REQUESTED,
    email,
  };
}
