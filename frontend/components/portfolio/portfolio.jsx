import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class Portfolio extends React.Component {
  constructor(props) {
      super(props);
      this.state = { stockTicker: '', numShares: '' };
  }

  componentDidMount(){
    this.props.requestTransactions();
  }

  componentDidUpdate(_, prevState){
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

  handleSubmit(e){
    e.preventDefault();
    this.props.createTransaction({
      user_id: this.props.currentUser.id,
      stock_symbol: this.state.stockTicker,
      num_shares: this.state.numShares,
      stock_price: this.props.price,
      transaction_type: 'buy'
    })
  }

  calculateTotalCost(){
    // BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP })
    let total = this.props.price.slice(1) * this.state.numShares;
    if (total) return `Total $${Number.parseFloat(total).toFixed(2)}`;
    else return null;
  }

  render() {
    return (
      <div>
        {this.props.currentUser.username}'s portfolio. Net worth: ${this.props.currentUser.portfolio}
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>

        <form onSubmit={this.handleSubmit.bind(this)} style={{ float: "right" }}>
          <label>Make a transaction</label> <br/>
          Balance: {this.props.currentUser.balance} <br/>

          {this.props.errors.stock} <br/>
          {this.props.errors.transaction.stock_ticker} <br/>
          <Input type="text" placeholder={"Enter stock ticker"} onChange={this.update('stockTicker')} value={this.state.stockTicker}/> <br/>
          {this.props.errors.transaction.num_shares} <br />
          <Input type="number" placeholder={"Amount of shares"} onChange={this.update('numShares')} value={this.state.numShares}/> <br/>
          {this.props.price} {this.props.company}<br/>
          {this.props.errors.transaction.balance}<br />
          {this.calculateTotalCost()} <br/>
          <Button type="submit" 
                  variant="contained" color="primary">
                  Place Order
          </Button>
        </form>
      </div>
    )
  }
}

export default Portfolio;