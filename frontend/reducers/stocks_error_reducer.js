import { RECEIVE_STOCK_ERRORS } from '../actions/stock_actions';

export default (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_STOCK_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};