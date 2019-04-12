import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge(newState, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_TRANSACTION:
      newState[action.payload.user_id].balance = action.payload.balance
      return newState;
    default:
      return oldState
  }
}

export default usersReducer;