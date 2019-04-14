import merge from 'lodash/merge';
import { RECEIVE_STOCKS_PORTFOLIO } from '../actions/stock_actions';

const portfolioReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCKS_PORTFOLIO:
      return merge(oldState, action.portfolio);
    default:
      return oldState;
  }
}

export default portfolioReducer;