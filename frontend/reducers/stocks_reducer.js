import merge from 'lodash/merge';

import { RECEIVE_STOCK_PRICE, RECEIVE_STOCK_ERRORS } from '../actions/stock_actions';

const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_PRICE:
      merge(newState, { ["price"]: action.price });
      return newState;
    case RECEIVE_STOCK_ERRORS:
      merge(newState, { ["price"]: "Price per share" });
      return newState;
    default:
      return oldState;
  }
}

export default stocksReducer;