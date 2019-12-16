/*
 *
 * Form actions
 *
 */

import {
  CLEAR_SENT,
  POST_INFO_REQUESTED,
  SELECT_DEFINITION,
} from './constants';

export function selectDefintion(definition) {
  return {
    type: SELECT_DEFINITION,
    definition,
  };
}

export function postRecord(update, definition, fields) {
  return {
    type: POST_INFO_REQUESTED,
    update,
    definition,
    fields,
  };
}

export function clearSent() {
  return {
    type: CLEAR_SENT,
  };
}
