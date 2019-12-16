/*
 *
 * Applicants reducer
 *
 */
import produce from 'immer';
import {
  DATA_SELECT,
  DATA_REQUESTED,
  DATA_SUCCEEDED,
  DATA_FAILED,
  DATA_CLEAR,
  DATA_DELETE_REQUESTED,
  DATA_DELETE_SUCCEDED,
  DATA_DELETE_FAILED,
  DATA_SET_FILTER,
  DATA_SET_PAGE,
  DATA_SET_NEXT_PAGE,
  DATA_SET_DEFINITION,
  DATA_CLEAR_RECORDS,
  DATA_CHANGE_REQUESTED,
  DATA_CHANGE_SUCCEDED,
  DATA_CHANGE_FAILED,
} from './constants';

export const initialState = {
  records: [],
  definition: '',
  selected: [],
  loading: false,
  page: 0,
  filter: '',
  isView: false,
  askMore: false,
  altering: false,
};

const DATA_ACTIONS = [
  DATA_SELECT,
  DATA_REQUESTED,
  DATA_SUCCEEDED,
  DATA_CLEAR,
  DATA_DELETE_REQUESTED,
  DATA_DELETE_SUCCEDED,
  DATA_DELETE_FAILED,
  DATA_SET_FILTER,
  DATA_SET_PAGE,
  DATA_SET_NEXT_PAGE,
  DATA_SET_DEFINITION,
  DATA_CLEAR_RECORDS,
];

/* eslint-disable default-case, no-param-reassign */
const dataReducer = (state = {}, action) =>
  produce(state, draft => {
    if (
      DATA_ACTIONS.includes(action.type) &&
      !Object.hasOwnProperty.call(draft, action.instanceID)
    ) {
      draft[action.instanceID] = initialState;
    }
    switch (action.type) {
      case DATA_SELECT:
        draft[action.instanceID].selected = action.selected;
        break;
      case DATA_SET_FILTER:
        draft[action.instanceID].filter = action.filter;
        break;
      case DATA_SET_PAGE:
        draft[action.instanceID].page = action.page;
        break;
      case DATA_SET_NEXT_PAGE:
        draft[action.instanceID].page += 1;
        break;
      case DATA_REQUESTED:
        draft[action.instanceID].loading = true;
        break;
      case DATA_DELETE_REQUESTED:
        draft[action.instanceID].deleting = true;
        break;
      case DATA_DELETE_SUCCEDED:
        draft[action.instanceID].deleting = false;
        draft[action.instanceID].records.filter(
          (_, i) => !draft[action.instanceID].selected.includes(i),
        );
        draft[action.instanceID].selected = [];
        break;
      case DATA_DELETE_FAILED:
        draft[action.instanceID].deleting = false;
        break;
      case DATA_SUCCEEDED:
        draft[action.instanceID].records.push(...action.data.records);
        draft[action.instanceID].loading = false;
        draft[action.instanceID].askMore = !!action.data.records.length;
        break;
      case DATA_SET_DEFINITION:
        draft[action.instanceID].definition = action.definition;
        draft[action.instanceID].isView = action.isView;
        break;
      case DATA_FAILED:
        draft[action.instanceID].loading = false;
      // falls through
      case DATA_CLEAR_RECORDS:
        draft[action.instanceID].records = [];
        draft[action.instanceID].page = 0;
        draft[action.instanceID].selected = [];
        break;
      case DATA_CHANGE_REQUESTED:
        draft[action.instanceID].altering = true;
        break;
      case DATA_CHANGE_SUCCEDED:
      case DATA_CHANGE_FAILED:
        draft[action.instanceID].altering = false;
        break;
      case DATA_CLEAR:
        // draft = initialState;
        break;
    }
    return undefined;
  });

export default dataReducer;
