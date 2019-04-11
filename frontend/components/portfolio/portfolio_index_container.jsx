import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Portfolio from './portfolio';
import { requestStockPrice } from '../../actions/stock_actions';

const msp = (state) => {
  const stockPrice = state.entities.stocks.price || "Price per share";
  debugger
  return {
    currentUser: state.entities.users[state.session.id],
    formType: "Portfolio",
    price: stockPrice,
    errors: state.errors.stock
  }
}

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    requestStockPrice: (stockTicker) => dispatch(requestStockPrice(stockTicker))
  })
}

export default connect(msp, mdp)(Portfolio)

