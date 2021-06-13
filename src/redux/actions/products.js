import { UPDATE_DATATABLE, PUSH_DATA } from '../constants/products';

export const updateDataTable = (data) => ({
  type: UPDATE_DATATABLE,
  payload: data,
});

export const getData = (data) => ({
  type: PUSH_DATA,
  payload: data,
});
