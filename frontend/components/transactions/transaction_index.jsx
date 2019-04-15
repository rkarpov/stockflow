import React from 'react';
import TransactionIndexItem from './transaction_index_item';

class TransactionIndex extends React.Component {
  componentDidMount() {
    this.props.requestTransactions();
  }

  render() {
    const transactions = this.props.transactions.map(transaction => {
      debugger
      return <TransactionIndexItem
        key={`transaction-${transaction.id}`}
        transaction={ transaction }
        currentUser={this.props.currentUser}
      />
    })

    return (
      <div>
        TYPE / TICKER / NUM / PRICE
        { transactions }
      </div>
    )
  }
}

export default TransactionIndex;