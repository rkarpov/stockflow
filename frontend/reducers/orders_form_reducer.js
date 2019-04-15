import merge from 'lodash/merge';
import { RECEIVE_STOCK_PRICE } from '../actions/stock_actions';

const ordersFormReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_STOCK_PRICE:
      if (action.payload.price === undefined) { // if input field empty
        merge(newState, { ["price"]: "", ["company"]: "" })
      } else {
        merge(newState, action.payload);
      }
      // merge(newState, { ["price"]: action.price }); // for front end call
      return newState;
   default:
      return oldState;
  }
}

export default ordersFormReducer;