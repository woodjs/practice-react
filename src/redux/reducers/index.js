import { combineReducers } from 'redux';
import productsReducer from './products';
import cursorsReducer from './cursors';

const rootReducer = combineReducers({
  products: productsReducer,
  // cursors: cursorsReducer,
});

export default rootReducer;
