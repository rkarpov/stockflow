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
        {this.stock.num_shares} shares
        {this.stock.net_stock_value}
      </div>
    )
  }


}

export default withRouter(StockIndexItem);