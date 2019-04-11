import { combineReducers } from 'redux';
import users from './users_reducer';
import stocks from './stocks_reducer';
import transactions from './transactions_reducer';

export default combineReducers({
    users,
    stocks,
    transactions,
});
