import React from 'react';
import { debounce } from "throttle-debounce";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
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
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 5,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tickerSymbol: '', numShares: '',
      selectedValue: 'buy', open: false,
    };
    this.currencyToNum = this.currencyToNum.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.debouncedStockPriceSearch = debounce(500, this.props.requestStockPrice)
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    this.props.clearForm();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tickerSymbol != this.state.tickerSymbol) {
      // fetch stock price as state changes for stock ticker field input
      this.debouncedStockPriceSearch(this.state.tickerSymbol)
    } else if (prevProps.currentUser.balance != this.props.currentUser.balance) {
      // render modal with confirmation of successful transaction
      this.handleOpen();
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
    if (total) return `$${Number.parseFloat(total).toFixed(2)}`.replace(/[^0-9.-]+-/g, "");
    else return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ numShares: Math.abs(this.state.numShares) })
    let numShares = this.state.numShares
    if (this.state.selectedValue === "sell") {
      // this.setState({ numShares: this.state.numShares *= -1 });
      numShares = numShares * -1
    } else { 
      numShares = Math.abs(numShares)
    }
    this.props.createTransaction({
      transaction_type: this.state.selectedValue,
      user_id: this.props.currentUser.id,
      stock_symbol: this.state.tickerSymbol,
      num_shares: numShares,
      net_stock_shares: this.props.netStockShares,
      stock_price: this.currencyToNum(this.props.price),
      net_stock_value: this.currencyToNum(this.props.netStockValue),
      net_asset_value: this.currencyToNum(this.props.currentUser.netAssetValue),
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ selectedValue: e.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderModal(){
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={{ top: '30%', left: '35%' }} className={classes.modal}>
            <Typography style={{ margin: 10 }} variant="h5" id="modal-title">
              Thank you for your order!
            </Typography>
            <Typography style={{ margin: 10 }} variant="subtitle1" id="modal-description">
              We received your transaction of {this.calculateTotalCost()} <br/>
              for {this.state.numShares} share(s) of {this.props.company}.
            </Typography>
            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={this.handleClose}>OK</Button>
          </div>
        </Modal>
      </div>
    );  
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        {this.state.open ? this.renderModal() : null}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Place Transaction<br />
            Balance ({this.props.currentUser.balance})
          </Typography>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <label>Buy:</label>
            <Checkbox checked={this.state.selectedValue === 'buy'} onChange={this.handleChange} value="buy"/>
            <label>Sell:</label>
            <Checkbox checked={this.state.selectedValue === 'sell'} onChange={this.handleChange} value="sell"/>
            <label style={{ color: "#ff5722" }}>{this.props.errors.stock}</label><br/>
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.tickerSymbol}</label><br/>
            <Input type="text" placeholder={"Enter stock ticker"} onChange={this.update('tickerSymbol')} value={this.state.tickerSymbol} /> <br />
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.numShares}</label><br/>
            <Input type="number" placeholder={"Amount of shares"} onChange={this.update('numShares')}
                   value={this.state.numShares.includes('-') ? Math.abs(this.state.numShares) : this.state.numShares}/><br />
            {this.props.price} {this.props.company}<br />
            <label style={{ color: "#ff5722" }}>{this.props.errors.transaction.balance}</label><br />
            Total {this.calculateTotalCost()} <br />
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