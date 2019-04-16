import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class StockIndexItem extends React.Component {

  render() {
    return (
      <div>
        ({this.props.stock.ticker_symbol})
        ({this.props.stock.company})
        ({this.props.stock.numShares} shares)
        ({this.props.stock.netStockValue})
      </div>
    )
  }

}

export default withRouter(StockIndexItem);