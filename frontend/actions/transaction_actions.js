import * as transactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

export const receiveTransactions = (transactions) => {
  return ({
    type: RECEIVE_TRANSACTIONS,
    transactions
  })
}

const receiveTransaction = transaction => {
  return ({
    type: RECEIVE_TRANSACTION,
    transaction
  })
}

export const receiveAllTransactions = () => dispatch => {
  return (
    transactionApiUtil.fetchTransactions().then(
      transactions => dispatch(receiveTransactions(transactions)))
  )
}

export const createTransaction = (payload) => dispatch => {
  return (
    transactionApiUtil.createTransaction(payload).then(
      transaction => dispatch(receiveTransaction(transaction)))
  );
};