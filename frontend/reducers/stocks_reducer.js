import merge from 'lodash/merge';

import { RECEIVE_STOCK_PRICE } from '../actions/stock_actions';
import { RECEIVE_STOCK_ERRORS } from '../actions/stock_actions';


const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_PRICE:
      merge(newState, { ["price"]: action.price} );
      return newState;
    case RECEIVE_STOCK_ERRORS:
      merge(newState, { ["price"]: action.errors} );
      return newState;
    default:
      return oldState;
  }
}

export default stocksReducer;