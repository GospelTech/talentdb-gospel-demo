/*
 *
 * Data constants
 *
 */

export const DATA_REQUESTED = 'app/Data/DATA_REQUESTED';
export const DATA_SUCCEEDED = 'app/Data/DATA_SUCCEEDED';
export const DATA_FAILED = 'app/Data/DATA_FAILED';
export const GET = {
  request: DATA_REQUESTED,
  success: DATA_SUCCEEDED,
  failure: DATA_FAILED,
};

export const DATA_SELECT = 'app/Data/DATA_SELECT';
export const DATA_CLEAR = 'app/Data/DATA_CLEAR';

export const DATA_DELETE_REQUESTED = 'app/DATA/DATA_DELETE_REQUESTED';
export const DATA_DELETE_SUCCEDED = 'app/DATA/DATA_DELETE_SUCCEDED';
export const DATA_DELETE_FAILED = 'app/DATA/DATA_DELETE_FAILED';
export const DELETE = {
  request: DATA_DELETE_REQUESTED,
  success: DATA_DELETE_SUCCEDED,
  failure: DATA_DELETE_FAILED,
};

export const DATA_SET_FILTER = 'app/DATA/DATA_SET_FILTER';
export const DATA_SET_PAGE = 'app/DATA/DATA_SET_PAGE';
export const DATA_SET_NEXT_PAGE = 'app/DATA/DATA_SET_NEXT_PAGE';
export const DATA_SET_DEFINITION = 'app/DATA/DATA_SET_DEFINITION';
export const DATA_CLEAR_RECORDS = 'app/DATA/DATA_CLEAR_RECORDS';

export const DATA_CHANGE_REQUESTED = 'app/DATA/DATA_CHANGE_REQUESTED';
export const DATA_CHANGE_SUCCEDED = 'app/DATA/DATA_CHANGE_SUCCEDED';
export const DATA_CHANGE_FAILED = 'app/DATA/DATA_CHANGE_FAILED';
export const DATA_CHANGE = {
  request: DATA_CHANGE_REQUESTED,
  success: DATA_CHANGE_SUCCEDED,
  failure: DATA_CHANGE_FAILED,
};
