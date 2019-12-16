/*
 *
 * FetchDetail actions
 *
 */

import { GET_DETAIL_REQUESTED } from './constants';

export function fetchDetail(definition, id, fromView, search) {
  return {
    type: GET_DETAIL_REQUESTED,
    definition,
    id,
    fromView,
    search,
  };
}
