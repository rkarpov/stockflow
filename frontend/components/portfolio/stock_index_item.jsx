import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class StockIndexItem extends React.Component {
  performance(val){
    // open price <=> current price
    switch (val) {
      case -1:
        return "green"
      case 0:
        return "grey"
      case 1:
        return "red"
    }
  }

  render() {
    const val = this.performance(this.props.stock.performance)
    const linkProps = { pathname: '/chart', stockId: this.props.stock.id, tickerSymbol: this.props.stock.ticker_symbol, company: this.props.stock.company }
    return (
      <TableRow>
        <TableCell align="center"><Link style={{ color: val, textDecoration: 'none' }} to={linkProps}>{this.props.stock.ticker_symbol}</Link></TableCell>
        <TableCell align="center"><Link style={{ textDecoration: 'none' }} to={linkProps}>{this.props.stock.company}</Link></TableCell>
        <TableCell align="center">{this.props.stock.numShares}</TableCell>
        <TableCell style={{ color: val }} align="center">{this.props.stock.netStockValue}</TableCell>
      </TableRow>
    )
  }

}

export default withRouter(StockIndexItem);