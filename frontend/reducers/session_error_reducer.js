import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, REMOVE_SESSION_ERRORS } from '../actions/session_actions';

export default (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case REMOVE_SESSION_ERRORS:
      return [];
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return oldState;
  }
};