import React from 'react';
import Button from '@material-ui/core/Button';


class Portfolio extends React.Component {
  constructor(props) {
      super(props);
      this.state = { stockTicker: '', numShares: '' };
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

  render() {
    return (
      <div>
        {this.props.currentUser.username}'s portfolio. 
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>

        <form onSubmit={this.handleSubmit.bind(this)} style={{ float: "right" }}>
          <label>Make a transaction</label> <br/>
          Balance: ${this.props.currentUser.balance} <br/>
          {this.props.errors} <br/>
          <input placeholder={"Enter stock ticker"} onChange={this.update('stockTicker')} value={this.state.stockTicker}/> <br/>
          <input placeholder={"Amount of shares"} onChange={this.update('numShares')} value={this.state.numShares}/> <br/>
          $ {this.props.price} <br/>
          Total $ {this.props.price * this.state.numShares ? this.props.price * this.state.numShares : null} <br/>
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