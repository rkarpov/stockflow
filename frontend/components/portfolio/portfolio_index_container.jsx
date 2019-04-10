import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Portfolio from './portfolio';
import { requestStockPrice } from '../../actions/stock_actions';

const msp = (state) => {
  debugger
  const stockPrice = state.entities.stocks.price || 0;
  return {
    currentUser: state.entities.users[state.session.id],
    formType: "Portfolio",
    credentials: { email: '', password: '' },
    price: stockPrice
    // loginErrors: errors.session,
    // errors: errors.session,
  }
}

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    requestStockPrice: (stockTicker) => dispatch(requestStockPrice(stockTicker))
  })
}

export default connect(msp, mdp)(Portfolio)

