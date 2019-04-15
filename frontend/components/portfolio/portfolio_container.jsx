import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Portfolio from './portfolio';
import { requestStockPrice, requestStockPortfolio } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';

const msp = (state) => {
  const stockPrice = state.entities.ordersForm.price || "Price per share";
  return {
    currentUser: state.entities.users[state.session.id],
    company: state.entities.ordersForm.company,
    price: stockPrice,
    errors: state.errors
  }
}

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    requestStockPrice: (stockTicker) => dispatch(requestStockPrice(stockTicker)),
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
    requestStockPortfolio: () => dispatch(requestStockPortfolio())
  })
}

export default connect(msp, mdp)(Portfolio)

