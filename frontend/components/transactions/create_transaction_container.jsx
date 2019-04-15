import React from 'react';
import { connect } from 'react-redux';
import TransactionForm from './transaction_form';
import { requestStockPrice } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';

const msp = (state) => {
  const stockPrice = state.entities.ordersForm.price || "Price per share";
  const stock = state.entities.stocks[state.entities.ordersForm.stockId] || { ["net_stock_value"]: "0", ["num_shares"]: 0 };
  return {
    currentUser: state.entities.users[state.session.id],
    company: state.entities.ordersForm.company,
    price: stockPrice,
    netStockValue: stock.net_stock_value,
    netStockShares: stock.num_shares,
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

