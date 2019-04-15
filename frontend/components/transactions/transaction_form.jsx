import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stockTicker: '', numShares: '' };
    this.currencyToNum = this.currencyToNum.bind(this)
  }

  componentDidUpdate(_, prevState) {
    // fetch stock price as state changes for stock ticker field input
    if (prevState.stockTicker != this.state.stockTicker) {
      this.props.requestStockPrice(this.state.stockTicker)
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
    const stock_price = this.currencyToNum(this.props.price)
    let total = stock_price * this.state.numShares;
    if (total) return `Total $${Number.parseFloat(total).toFixed(2)}`;
    else return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    this.props.createTransaction({
      transaction_type: 'buy',
      user_id: this.props.currentUser.id,
      stock_symbol: this.state.stockTicker,
      num_shares: this.state.numShares,
      netStockShares: this.props.netStockShares,
      stock_price: this.currencyToNum(this.props.price),
      net_stock_value: this.currencyToNum(this.props.netStockValue),
      net_asset_value: this.currencyToNum(this.props.currentUser.netAssetValue),
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} style={{ float: "right" }}>
          <label>Make a transaction</label> <br />
          Balance: {this.props.currentUser.balance} <br />
          {this.props.errors.stock} <br />
          {this.props.errors.transaction.stock_ticker} <br />
          <Input type="text" placeholder={"Enter stock ticker"} onChange={this.update('stockTicker')} value={this.state.stockTicker} /> <br />
          {this.props.errors.transaction.num_shares} <br />
          <Input type="number" placeholder={"Amount of shares"} onChange={this.update('numShares')} value={this.state.numShares} /> <br />
          {this.props.price} {this.props.company}<br />
          {this.props.errors.transaction.balance}<br />
          {this.calculateTotalCost()} <br />
          <Button type="submit"
            variant="contained" color="primary">
            Place Order
          </Button>
        </form>
      </div>
    )
  }
}

export default TransactionForm;