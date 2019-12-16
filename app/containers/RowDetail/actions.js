/*
 *
 * RowDetail actions
 *
 */

import { GET_DETAIL_REQUESTED } from './constants';

export function fetchDetail(definition, id, fromView) {
  return {
    type: GET_DETAIL_REQUESTED,
    definition,
    id,
    fromView,
  };
}
