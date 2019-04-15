import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class StockIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.stock = this.props.stock;
  }

  render() {
    return (
      <div>
        {this.stock.ticker_symbol}
        {this.stock.company}
        {this.stock.numShares} shares
        {this.stock.netStockValue}
      </div>
    )
  }


}

export default withRouter(StockIndexItem);