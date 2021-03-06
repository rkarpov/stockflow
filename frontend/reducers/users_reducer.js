import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';
import { RECEIVE_STOCKS_PORTFOLIO } from '../actions/stock_actions';

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { [action.currentUser.id]: action.currentUser };
    case RECEIVE_TRANSACTION:
      return merge(newState, action.payload.user);
    case RECEIVE_STOCKS_PORTFOLIO:
      return merge(newState, action.payload.user);
    default:
      return oldState
  }
}

export default usersReducer;