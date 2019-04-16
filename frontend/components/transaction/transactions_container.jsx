import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { requestTransactions } from '../../actions/transaction_actions';
import TransactionIndex from './transaction_index'

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    transactions: Object.values(state.entities.transactions),
    errors: state.errors
  }
}

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
    requestTransactions: () => dispatch(requestTransactions())
  })
}

export default connect(msp, mdp)(TransactionIndex)

