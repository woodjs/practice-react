/* eslint-disable no-param-reassign */
import { UPDATE_DATATABLE, PUSH_DATA } from '../constants/products';

const initialState = {
  products: [],
};

const replaceElement = (arr, object) => {
  const { id, value, replace } = object;
  return arr.map((item) => {
    if (item.id === id) {
      item[replace] = value;
    }
    return item;
  });
};

const productsReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATATABLE:
      return {
        ...state,
        products: replaceElement(state.products, action.payload),
      };

    case PUSH_DATA:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

// SELECTORS
export const getProducts = (state) => state.products;

export default productsReducer;
