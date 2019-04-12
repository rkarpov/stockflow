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
      if (action.transaction.transaction_type === "buy") {
        newState[action.transaction.user_id]["balance"] -= action.transaction.purchase_amount;
        return newState;
      } 
    default:
      return oldState
  }
}

export default usersReducer;