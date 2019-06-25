import * as iexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const RECEIVE_STOCKS_PORTFOLIO = 'RECEIVE_STOCKS_PORTFOLIO';
export const RECEIVE_STOCK_CHART = 'RECEIVE_STOCK_CHART';

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

const receiveStockChart = (payload) => {
  return ({
    type: RECEIVE_STOCK_CHART,
    payload
  })
}

const receiveErrors = errors => {
  return ({
    type: RECEIVE_STOCK_ERRORS,
    errors
  });
};

export const requestStockPortfolio = () => dispatch => {
  return (
    iexApiUtil.fetchStockPortfolio().then(
      portfolio => dispatch(receiveStocksPortfolio(portfolio)),
      error => dispatch(receiveErrors(error.responseJSON)))
  );
};

export const requestStockPrice = (tickerSymbol) => dispatch => {
  return (
    iexApiUtil.fetchStockPrice(tickerSymbol).then(
      price => dispatch(receiveStockPrice(price)),
      error => dispatch(receiveErrors(error.responseJSON))
      // error => dispatch(receiveErrors(error["responseText"])) // for front end api calls
    )
  );
};
                  // { tickerSymbol: '', dateRange: '' }
export const requestStockChart = (data) => dispatch => {
   return (
    iexApiUtil.fetchStockChart(data).then(
      payload => dispatch(receiveStockChart(payload))
    )
   )
};
                // { type: company or symbol, string: '' }
export const searchStocks = (payload) => dispatch => {
  return (
    transactionApiUtil.createTransaction(payload).then(
      transaction => (dispatch(receiveSearchResults(transaction))),
      error => (dispatch(receiveErrors(error.responseJSON)))
    ));
};