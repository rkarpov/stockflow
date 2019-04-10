import merge from 'lodash/merge';

import { RECEIVESTOCKPRICE } from '../actions/stock_actions';

const stocksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  debugger
  switch (action.type) {
    case RECEIVESTOCKPRICE:
    debugger
      merge(newState, { ["price"]: action.price} );
      return newState;
    default:
      return oldState;
  }
}

export default stocksReducer;