import {
  CHANGE_CURSOR,
  PUSH_CURSOR,
  REMOVE_CURSOR,
} from '../constants/cursors';

const initialState = {
  data: [],
};

const cursorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_CURSOR:
      return {
        ...state.data,
        data: state.data.push(213),
      };
    case CHANGE_CURSOR:
      return {
        ...state.data,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...state.data.item,
              posX: action.payload.x,
              posY: action.payload.y,
            };
          }

          return null;
        }),
      };
    case REMOVE_CURSOR:
      return {
        ...state.data,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cursorsReducer;
