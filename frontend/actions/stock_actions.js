import * as iexApiUtil from '../util/iex_api_util';
import * as stockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

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

const receiveTransaction = transaction => {
  return ({
    type: CREATE_TRANSACTION,
    transaction
  })
}

export const requestStockPrice = (tickerSymbol) => dispatch => {
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(
      price => dispatch(receiveStockPrice(price)),
      error => dispatch(receiveErrors(error["responseText"]))
    )
  );
};

export const createTransaction = (payload) => dispatch => {
  return (
    stockApiUtil.createTransaction(payload).then(
      transaction => dispatch(receiveTransaction(transaction)))
  );
};