import merge from 'lodash/merge';
import { RECEIVE_STOCKCHART_PARAMS } from '../actions/stock_actions';

const stockchartParamsReducer = (oldState = { ticker: '', range: '1m' }, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCKCHART_PARAMS:
      return merge(newState, action.params);
    default:
      return oldState;
  }
}

export default stockchartParamsReducer;