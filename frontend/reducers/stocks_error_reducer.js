// import { RECEIVE_STOCK_PRICE, RECEIVE_STOCK_ERRORS } from '../actions/stock_actions';

// export default (oldState = [], action) => {
//   Object.freeze(oldState);
//   switch (action.type) {
//     case RECEIVE_STOCK_ERRORS:
//       if (action.errors === undefined) return [];
//       else return action.errors;
//     case RECEIVE_STOCK_PRICE:
//       return [];
//     default:
//       return oldState;
//   }
// };