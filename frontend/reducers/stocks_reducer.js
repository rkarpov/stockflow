import merge from 'lodash/merge';

import { RECEIVE_STOCKS_PORTFOLIO } from '../actions/stock_actions';
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';
// import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCKS_PORTFOLIO:
    // debugger
      // return merge(newState, action.payload.stocks);
      return action.payload.stocks;
    case RECEIVE_TRANSACTION:
      return merge(newState, action.payload.stock)
    // case RECEIVE_CURRENT_USER:
    //   return {};
    default:
      return oldState;
  }
}

export default stocksReducer;