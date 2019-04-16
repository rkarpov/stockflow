import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class StockIndexItem extends React.Component {

  render() {
    return (
      <TableRow>
        <TableCell style={{ color: `${this.props.stock.performance}` }} align="center">{this.props.stock.ticker_symbol}</TableCell>
        <TableCell align="center">{this.props.stock.company}</TableCell>
        <TableCell align="center">{this.props.stock.numShares}</TableCell>
        <TableCell style={{ color: `${this.props.stock.performance}` }} align="center">{this.props.stock.netStockValue}</TableCell>
      </TableRow>
    )
  }

}

export default withRouter(StockIndexItem);