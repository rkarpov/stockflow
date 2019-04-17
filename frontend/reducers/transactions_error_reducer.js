import merge from 'lodash/merge';
import { RECEIVE_TRANSACTION_ERRORS, RECEIVE_TRANSACTION } from '../actions/transaction_actions';
import { RECEIVE_STOCK_ERRORS, RECEIVE_STOCK_PRICE } from '../actions/stock_actions';


export default (oldState = [], action) => {
  Object.freeze(oldState);
  let newState = { ["tickerSymbol"]: [], ["balance"]: [], ["numShares"]: [] }
  switch (action.type) {
    case RECEIVE_STOCK_ERRORS:
      return merge(newState, action.errors);
    case RECEIVE_STOCK_PRICE:
      return [];
    case RECEIVE_TRANSACTION_ERRORS:
      return merge(newState, action.errors);
    case RECEIVE_TRANSACTION:
      return [];
    default:
      return oldState;
  }
};