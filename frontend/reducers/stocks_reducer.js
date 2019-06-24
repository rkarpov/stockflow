import merge from 'lodash/merge';

import { RECEIVE_STOCKS_PORTFOLIO } from '../actions/stock_actions';
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';
import { RECEIVE_STOCK_CHART } from '../actions/stock_actions';

const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCKS_PORTFOLIO:
      return action.payload.stocks;
    case RECEIVE_TRANSACTION:
      return merge(newState, action.payload.stock)
    case RECEIVE_STOCK_CHART:
      return merge (newState, action.payload.chartData.quote)
    default:
      return oldState;
  }
}

export default stocksReducer;