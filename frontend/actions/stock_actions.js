import * as iexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const RECEIVE_STOCKS_PORTFOLIO = 'RECEIVE_STOCKS_PORTFOLIO';

const receiveStocksPortfolio = (portfolio) => {
  return ({
    type: RECEIVE_STOCKS_PORTFOLIO,
    portfolio
  })
}

const receiveStockPrice = (price) => {
  return ({
    type: RECEIVE_STOCK_PRICE,
    price
    // price: Number.parseFloat(price).toFixed(2)
  });
};

const receiveErrors = errors => {
  return ({
    type: RECEIVE_STOCK_ERRORS,
    errors
  });
};

export const requestStockPortfolio = () => dispatch => {
  return (
    iexApiUtil.fetchStockPortfolio().then(portfolio => dispatch(receiveStocksPortfolio(portfolio)))
  );
};

export const requestStockPrice = (tickerSymbol) => dispatch => {
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(
      price => dispatch(receiveStockPrice(price)),
      error => dispatch(receiveErrors(error.responseJSON))
      // error => dispatch(receiveErrors(error["responseText"])) // for front end calls
    )
  );
};