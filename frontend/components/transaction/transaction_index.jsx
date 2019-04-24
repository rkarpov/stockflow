import React from 'react';
import TransactionIndexItem from './transaction_index_item';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    maxWidth: 650,
    maxHeight: 550,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: 50,
  },
  table: {
    minWidth: 400,
  },
  header: {
    marginLeft: 275,
    marginTop: 25,
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0
  }
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
        <CssBaseline/>
        <Typography variant="h4" color="inherit" className={classes.header} align="left">
          Transactions
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head} align="center">Type</TableCell>
                <TableCell className={classes.head} align="center">Ticker</TableCell>
                <TableCell className={classes.head} align="center">Company</TableCell>
                <TableCell className={classes.head} align="center">Shares</TableCell>
                <TableCell className={classes.head} align="center">Price Per Share</TableCell>
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