import { UPDATE_DATATABLE, PUSH_DATA } from './types';

export function updateDataTable(data) {
  return {
    type: UPDATE_DATATABLE,
    payload: data,
  };
}

export function getData(data) {
  return {
    type: PUSH_DATA,
    payload: data,
  };
}
