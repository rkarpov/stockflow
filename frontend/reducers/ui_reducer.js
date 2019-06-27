import { combineReducers } from 'redux';
import ordersForm from './orders_form_reducer';
import search from './search_reducer';
import stockchartParams from './stockchart_params_reducer';

export default combineReducers({
    ordersForm,
    search,
    stockchartParams
});