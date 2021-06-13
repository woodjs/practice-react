import {
  CHANGE_CURSOR,
  PUSH_CURSOR,
  REMOVE_CURSOR,
} from '../constants/cursors';

export const addCursor = (data) => ({ type: PUSH_CURSOR, payload: data });
export const removeCursor = (id) => ({ type: REMOVE_CURSOR, payload: id });
export const changeCursor = (data) => ({ type: CHANGE_CURSOR, payload: data });
