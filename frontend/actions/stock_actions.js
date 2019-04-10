import * as iexApiUtil from '../util/iex_api_util';

// export const RECEIVESTOCK = 'RECEIVE_STOCK';
export const RECEIVESTOCKPRICE = 'RECEIVE_STOCK_PRICE';

// const receiveStock = (stock) => {
//   return({
//     type: RECEIVESTOCK,
//     stock
//   });
// };

const receiveStockPrice = (price) => {
  return({
    type: RECEIVESTOCKPRICE,
    price
  });
};

// export const requestStock = ()

export const requestStockPrice = (tickerSymbol) => dispatch => {
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(price => dispatch(receiveStockPrice(price)))
  );
};