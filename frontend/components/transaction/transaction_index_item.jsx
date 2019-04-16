import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class TransactionIndexItem extends React.Component {

  render() {
    return(
      <div>     
        {this.props.transaction.transaction_type.toUpperCase()}
        {this.props.transaction.ticker_symbol}
        {this.props.transaction.company}
        {this.props.transaction.num_shares} shares
        {this.props.transaction.stock_price}
      </div>
    )
  }

}

export default withRouter(TransactionIndexItem);