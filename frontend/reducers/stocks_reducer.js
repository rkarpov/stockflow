import merge from 'lodash/merge';

import { RECEIVE_STOCK_PRICE, RECEIVE_STOCK_ERRORS } from '../actions/stock_actions';

const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_PRICE:
      if (action.price === undefined) { // if input field empty
        merge(newState, { ["price"]: "", ["company"]: "" })
      } else {
        merge(newState, action.price);
      }
      // merge(newState, { ["price"]: action.price }); // for front end call
      return newState;
    case RECEIVE_STOCK_ERRORS:
      merge(newState, { ["price"]: "Price per share", ["company"]: "" });
      return newState;
    default:
      return oldState;
  }
}

export default stocksReducer;