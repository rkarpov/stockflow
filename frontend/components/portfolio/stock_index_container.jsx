import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import StockIndex from './stock_index';
import { requestStockPrice, requestStockPortfolio } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { setStockchartParams } from '../../actions/stock_actions';

const msp = (state) => {
  let currentUser = state.entities.users[state.session.id];
  if (currentUser["netAssetValue"] === undefined){
    currentUser["netAssetValue"] = ""
  };
  return {
    currentUser,
    stocks: Object.values(state.entities.stocks),
    errors: state.errors
  }
}

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    requestStockPrice: (tickerSymbol) => dispatch(requestStockPrice(tickerSymbol)),
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
    requestStockPortfolio: () => dispatch(requestStockPortfolio()),
    setStockchartParams: (params) => dispatch(setStockchartParams(params))
  })
}

export default connect(msp, mdp)(StockIndex)

