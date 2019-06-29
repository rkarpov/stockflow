import * as iexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_PRICE = 'RECEIVE_STOCK_PRICE';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const RECEIVE_STOCKS_PORTFOLIO = 'RECEIVE_STOCKS_PORTFOLIO';
export const RECEIVE_STOCK_CHART = 'RECEIVE_STOCK_CHART';
export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export const RECEIVE_STOCKCHART_PARAMS = 'RECEIVE_STOCKCHART_PARAMS';

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
  debugger
  return ({
    type: RECEIVE_STOCK_CHART,
    payload
  })
}

const receiveSearchResults = (stocks) => {
  return ({
    type: RECEIVE_SEARCH_RESULT,
    stocks
  })
}

const receiveStockchartParams = (params) => {
  return ({
    type: RECEIVE_STOCKCHART_PARAMS,
    params
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
export const requestStocks = (data) => dispatch => {
  return (
    iexApiUtil.fetchSearchResults(data).then(
      stocks => (dispatch(receiveSearchResults(stocks))),
      error => (dispatch(receiveErrors(error.responseJSON)))
    ));
};

export const setStockchartParams = (data) => dispatch => {
  return (
    dispatch(receiveStockchartParams(data))
  )
}