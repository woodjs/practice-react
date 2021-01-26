/* eslint-disable no-param-reassign */
import { UPDATE_DATATABLE, PUSH_DATA } from './types';

const initialState = {
  products: [
    // { id: 1, name: 'Молоко', count: 40, priceForOne: 50 },
    // { id: 2, name: 'Банан', count: 30, priceForOne: 50 },
    // { id: 3, name: 'Яблоко', count: 10, priceForOne: 100 },
  ],
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

export default productsReducer;
