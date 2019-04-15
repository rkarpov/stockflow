import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class TransactionIndexItem extends React.Component {
  constructor(props){
    super(props)
    this.transaction = this.props.transaction;
  }

  render() {

    return(
      <div>     
        {this.transaction.transaction_type.toUpperCase()}
        {this.transaction.ticker_symbol}
        {this.transaction.num_shares} shares
        {this.transaction.stock_price}
      </div>
    )
  }


}

export default withRouter(TransactionIndexItem);