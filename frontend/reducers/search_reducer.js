import merge from 'lodash/merge';
import { RECEIVE_SEARCH_RESULT } from '../actions/stock_actions';

function searchReducer(oldState = {}, action) {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      return action.stocks
    default:
      return oldState;
  }
}

export default searchReducer;