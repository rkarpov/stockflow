import React from 'react';
import { debounce } from "throttle-debounce";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tickerSymbol: '', numShares: '' };
    this.currencyToNum = this.currencyToNum.bind(this)
    this.debouncedStockPriceSearch = debounce(500, this.props.requestStockPrice)
  }

  componentDidMount(){
    this.props.clearForm();
  }

  componentDidUpdate(_, prevState) {
    // fetch stock price as state changes for stock ticker field input
    if (prevState.tickerSymbol != this.state.tickerSymbol) {
      this.debouncedStockPriceSearch(this.state.tickerSymbol)
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  currencyToNum(amt) {
    if (amt != undefined) return Number((amt).replace(/[^0-9.-]+/g, ""));
    else return null; // after registration amt can be null
  }

  calculateTotalCost() {
    // BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP })
    const stockPrice = this.currencyToNum(this.props.price)
    let total = stockPrice * Math.abs(this.state.numShares);
    if (total) return `Total $${Number.parseFloat(total).toFixed(2)}`.replace(/[^0-9.-]+-/g, "");
    else return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTransaction({
      transaction_type: 'buy',
      user_id: this.props.currentUser.id,
      stock_symbol: this.state.tickerSymbol,
      num_shares: this.state.numShares,
      net_stock_shares: this.props.netStockShares,
      stock_price: this.currencyToNum(this.props.price),
      net_stock_value: this.currencyToNum(this.props.netStockValue),
      net_asset_value: this.currencyToNum(this.props.currentUser.netAssetValue),
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Place Transaction<br />
            Balance ({this.props.currentUser.balance})
          </Typography>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <label style={{ color: "#ff5722" }}>{this.props.errors.stock}</label><br/>
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.tickerSymbol}</label><br/>
            <Input type="text" placeholder={"Enter stock ticker"} onChange={this.update('tickerSymbol')} value={this.state.tickerSymbol} /> <br />
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.numShares}</label><br/>
            <Input type="number" placeholder={"Amount of shares"} onChange={this.update('numShares')}
                   value={this.state.numShares.includes('-') ? Math.abs(this.state.numShares) : this.state.numShares} /> <br />
            {this.props.price} {this.props.company}<br />
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.balance}</label><br />
            {this.calculateTotalCost()} <br />
            <Button type="submit"
              variant="contained" color="primary">
              Place Order
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(TransactionForm);