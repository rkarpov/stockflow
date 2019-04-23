import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class TransactionIndexItem extends React.Component {

  render() {
    return(
      <TableRow>
        <TableCell align="center">{this.props.transaction.transaction_type.toUpperCase()}</TableCell>
        <TableCell align="center">{this.props.transaction.tickerSymbol}</TableCell>
        <TableCell align="center">{this.props.transaction.company}</TableCell>
        <TableCell align="center">{Math.abs(this.props.transaction.num_shares)}</TableCell>
        <TableCell align="center">{this.props.transaction.stock_price}</TableCell>
      </TableRow>
    )
  }

}

export default withRouter(TransactionIndexItem);