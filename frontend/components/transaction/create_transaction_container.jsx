import React from 'react';
import { connect } from 'react-redux';
import TransactionForm from './transaction_form';
import { requestStockPrice } from '../../actions/stock_actions';
import { createTransaction, clearForm } from '../../actions/transaction_actions';

const msp = (state) => {
  const stockPrice = state.entities.ordersForm.price || "Price per share";
  const stock = state.entities.stocks[state.entities.ordersForm.stockId] || { ["netStockValue"]: "0", ["numShares"]: 0 };
  return {
    currentUser: state.entities.users[state.session.id],
    company: state.entities.ordersForm.company,
    price: stockPrice,
    netStockValue: stock.netStockValue,
    netStockShares: stock.numShares,
    errors: state.errors
  }
}

const mdp = dispatch => {
  return ({
    requestStockPrice: (tickerSymbol) => dispatch(requestStockPrice(tickerSymbol)),
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
    clearForm: () => dispatch(clearForm()),
  })
}

export default connect(msp, mdp)(TransactionForm)

