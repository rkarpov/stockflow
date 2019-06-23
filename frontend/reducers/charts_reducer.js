import merge from 'lodash/merge';
import { RECEIVE_STOCK_CHART } from '../actions/stock_actions';

const chartsNewsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_CHART:
      return merge(newState, action.payload.chartData);
    default:
      return oldState;
  }
}

export default chartsNewsReducer;