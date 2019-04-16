import React from 'react';
import TransactionIndexItem from './transaction_index_item';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    maxWidth: 650,
    maxHeight: 600,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

class TransactionIndex extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.requestTransactions();
  }

  render() {
    const transactions = this.props.transactions.map(transaction => {
      return <TransactionIndexItem
        key={`transaction-${transaction.id}`}
        transaction={ transaction }
        currentUser={this.props.currentUser}
      />
    })

    const { classes } = this.props

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Ticker</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Shares</TableCell>
                <TableCell align="center">Price Per Share</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { transactions }
            </TableBody>
          </Table>
        </Paper>
      </div>
  )
}
}
export default withStyles(styles)(TransactionIndex);

// export default TransactionIndex;