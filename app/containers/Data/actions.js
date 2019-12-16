/*
 *
 * Data actions
 *
 */

import {
  DATA_REQUESTED,
  DATA_CLEAR,
  DATA_SELECT,
  DATA_DELETE_REQUESTED,
  DATA_SET_FILTER,
  DATA_SET_PAGE,
  DATA_SET_DEFINITION,
  DATA_CLEAR_RECORDS,
  DATA_SET_NEXT_PAGE,
  DATA_CHANGE_REQUESTED,
} from './constants';

export function getData(instanceID) {
  return {
    type: DATA_REQUESTED,
    instanceID,
  };
}

export function clearData(instanceID) {
  return {
    type: DATA_CLEAR,
    instanceID,
  };
}

export function clearDataRecords(instanceID) {
  return {
    type: DATA_CLEAR_RECORDS,
    instanceID,
  };
}

export function selectData(instanceID, selected) {
  return {
    type: DATA_SELECT,
    selected,
    instanceID,
  };
}

export function deleteData(instanceID, definition, selected, actionType) {
  return {
    type: DATA_DELETE_REQUESTED,
    instanceID,
    definition,
    selected,
    deleting: true,
    actionType,
  };
}

export function setFilter(instanceID, filter) {
  return {
    type: DATA_SET_FILTER,
    filter,
    instanceID,
  };
}

export function setPage(instanceID, page) {
  return {
    type: DATA_SET_PAGE,
    page,
    instanceID,
  };
}

export function setNextPage(instanceID) {
  return {
    type: DATA_SET_NEXT_PAGE,
    instanceID,
  };
}

export function setDefinitionName(instanceID, definition, isView = false) {
  return {
    type: DATA_SET_DEFINITION,
    instanceID,
    definition,
    isView,
  };
}

export function alterData(instanceID, definition, fields, actionType) {
  return {
    type: DATA_CHANGE_REQUESTED,
    instanceID,
    definition,
    fields,
    actionType,
  };
}
