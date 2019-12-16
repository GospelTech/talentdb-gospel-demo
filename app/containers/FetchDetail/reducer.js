/*
 *
 * FetchDetail reducer
 *
 */
import produce from 'immer';
import {
  GET_DETAIL_FAILED,
  GET_DETAIL_REQUESTED,
  GET_DETAIL_SUCCEEDED,
  GET_DETAIL,
} from './constants';

export const initialState = {
  fields: {},
  loading: false,
  completed: false,
};

/* eslint-disable default-case, no-param-reassign */
const rowDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    if (Object.values(GET_DETAIL).includes(action.type)) {
      if (!Object.hasOwnProperty.call(draft, action.definition)) {
        draft[action.definition] = {};
      }
      if (!Object.hasOwnProperty.call(draft[action.definition], action.id)) {
        draft[action.definition][action.id] = initialState;
      }
    }

    switch (action.type) {
      case GET_DETAIL_REQUESTED:
        draft[action.definition][action.id].loading = true;
        break;
      case GET_DETAIL_SUCCEEDED:
        draft[action.definition][action.id].fields = action.fields;
        draft[action.definition][action.id].loading = false;
        draft[action.definition][action.id].completed = true;
        break;
      case GET_DETAIL_FAILED:
        draft[action.definition][action.id].loading = false;
        draft[action.definition][action.id].completed = true;
        break;
    }
  });

export default rowDetailReducer;
