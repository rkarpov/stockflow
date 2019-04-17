import * as iexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const RECEIVE_STOCKS_PORTFOLIO = 'RECEIVE_STOCKS_PORTFOLIO';

const receiveStocksPortfolio = (payload) => {
  return ({
    type: RECEIVE_STOCKS_PORTFOLIO,
    payload
  })
}

const receiveStockPrice = (payload) => {
  return ({
    type: RECEIVE_STOCK_PRICE,
    payload
    // price: Number.parseFloat(price).toFixed(2)
  });
};

const receiveErrors = errors => {
  debugger
  return ({
    type: RECEIVE_STOCK_ERRORS,
    errors
  });
};

export const requestStockPortfolio = () => dispatch => {
  debugger
  return (
    iexApiUtil.fetchStockPortfolio().then(
      portfolio => dispatch(receiveStocksPortfolio(portfolio)),
      error => dispatch(receiveErrors(error.responseJSON)))
  );
};

export const requestStockPrice = (tickerSymbol) => dispatch => {
  debugger
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(
      price => dispatch(receiveStockPrice(price)),
      error => dispatch(receiveErrors(error.responseJSON))
      // error => dispatch(receiveErrors(error["responseText"])) // for front end calls
    )
  );
};