import merge from 'lodash/merge';

import { RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS } from '../actions/transaction_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const transactionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_TRANSACTION:    
      merge(newState, action.payload.transaction)
      return newState;
    case RECEIVE_TRANSACTIONS:    
      merge(newState, action.transactions)
      return newState;
    case RECEIVE_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
}

export default transactionsReducer;