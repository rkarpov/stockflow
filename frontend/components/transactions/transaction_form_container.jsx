import React from 'react';
import { connect } from 'react-redux';
import TransactionForm from './transaction_form';
import { requestStockPrice } from '../../actions/stock_actions';
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
    requestStockPrice: (stockTicker) => dispatch(requestStockPrice(stockTicker)),
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
  })
}

export default connect(msp, mdp)(TransactionForm)

