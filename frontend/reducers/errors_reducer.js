import { combineReducers } from 'redux';
import session from './session_error_reducer';
// import stock from './stocks_error_reducer';
import transaction from './transactions_error_reducer';

export default combineReducers({
  // stock,
  transaction,
  session,
});
