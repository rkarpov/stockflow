import React from 'react';
import StockIndexItem from './stock_index_item';

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

class StockIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.requestStockPortfolio();
  }

  render() {
    const stocks = this.props.stocks.map(stock => {
      return <StockIndexItem
        key={`stock-${stock.id}`}
        stock={stock}
        currentUser={this.props.currentUser}
      />
    });

    const { classes } = this.props

    return (
      <div>
        {this.props.currentUser.username}'s portfolio. Net worth: {this.props.currentUser.netAssetValue}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Ticker</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Total Shares</TableCell>
                <TableCell align="center">Net Share Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(StockIndex);