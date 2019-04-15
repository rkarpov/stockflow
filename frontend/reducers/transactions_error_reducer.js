import merge from 'lodash/merge';
import { RECEIVE_TRANSACTION_ERRORS, RECEIVE_TRANSACTION } from '../actions/transaction_actions';

export default (oldState = [], action) => {
  Object.freeze(oldState);
  let newState = { ["stockTicker"]: [], ["balance"]: [], ["numShares"]: [] }
  switch (action.type) {
    case RECEIVE_TRANSACTION_ERRORS:
      return merge(newState, action.errors);
    case RECEIVE_TRANSACTION:
      return [];
    default:
      return oldState;
  }
};