import merge from 'lodash/merge';
import { RECEIVE_STOCK_ERRORS, RECEIVE_STOCK_PRICE } from '../actions/stock_actions';
import { CLEAR_TRANSACTION_FORM } from '../actions/transaction_actions';

const ordersFormReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_PRICE:
      if (action.payload.price === undefined) { // if input field empty
        merge(newState, { ["price"]: "", ["company"]: "" })
      } else {
        merge(newState, action.payload);
      }
      // merge(newState, { ["price"]: action.price }); // for front end call
      return newState;
    case RECEIVE_STOCK_ERRORS:
      return merge(newState, { ["price"]: "Price per share", ["company"]: "" });
    case CLEAR_TRANSACTION_FORM:
      return { ["price"]: "", ["company"]: "" };
    default:
      return oldState;
  }
}

export default ordersFormReducer;