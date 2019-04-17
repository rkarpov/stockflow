import * as transactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';
export const CLEAR_TRANSACTION_FORM = 'CLEAR_TRANSACTION_FORM';

export const receiveTransactions = (transactions) => {
  return ({
    type: RECEIVE_TRANSACTIONS,
    transactions
  })
}

const receiveTransaction = (payload) => {
  return ({
    type: RECEIVE_TRANSACTION,
    payload
  })
}

const receiveErrors = errors => {
  return ({
    type: RECEIVE_TRANSACTION_ERRORS,
    errors
  });
};

const removeErrorsPrice = errors => {
  return ({
    type: CLEAR_TRANSACTION_FORM,
    errors
  })
}

export const requestTransactions = () => dispatch => {
  return (
    transactionApiUtil.fetchTransactions().then(
      transactions => dispatch(receiveTransactions(transactions)))
  )
}

export const createTransaction = (payload) => dispatch => {
  return (
    transactionApiUtil.createTransaction(payload).then(
      transaction => (dispatch(receiveTransaction(transaction))),
      error => (dispatch(receiveErrors(error.responseJSON)))
    ));
};

export const clearForm = () => dispatch => {
  dispatch(removeErrorsPrice());
};