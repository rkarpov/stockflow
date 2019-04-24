import React from 'react';
import StockIndexItem from './stock_index_item';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0
  },
  header: {
    marginLeft: 105,
    marginTop: 25,
  },
  progress: {
    margin: theme.spacing.unit * 15,
  },
});

class StockIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount(){
    this.props.requestStockPortfolio();
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)  
  }

  render() {
    const stocks = this.props.stocks.map(stock => {
      if (stock.numShares === 0) {
        return // skip stock if user owns no shares
      } else {
        return <StockIndexItem
          key={`stock-${stock.id}`}
          stock={stock}
          currentUser={this.props.currentUser}
        />
      }
    });

    const { classes } = this.props
    return (
      <div>
        <Typography variant="h4" color="inherit" className={classes.header} align="left">
          Portfolio ({this.props.currentUser.netAssetValue})
        </Typography>
        <Paper className={classes.root}>
          <div hidden={this.state.loading === true ? null : "hidden"}>
            <CircularProgress className={classes.progress} />
          </div>
          <div hidden={this.state.loading === true ? "hidden" : null} >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head} align="center">Ticker</TableCell>
                <TableCell className={classes.head} align="center">Company</TableCell>
                <TableCell className={classes.head} align="center">Total Shares</TableCell>
                <TableCell className={classes.head} align="center">Net Share Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks}
            </TableBody>
          </Table>
          </div>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(StockIndex);