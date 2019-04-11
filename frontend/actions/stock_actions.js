import * as iexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';

const receiveStockPrice = (price) => {
  return ({
    type: RECEIVE_STOCK_PRICE,
    price
  });
};

const receiveErrors = errors => {
  return ({
    type: RECEIVE_STOCK_ERRORS,
    errors
  });
};

export const requestStockPrice = (tickerSymbol) => dispatch => {
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(
      price => dispatch(receiveStockPrice(price)),
      error => dispatch(receiveErrors(error["responseText"]))
    )
  );
};