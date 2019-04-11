import React from 'react';
import Button from '@material-ui/core/Button';


class Portfolio extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        stockTicker: '',
        price: this.props.price
      };
  }

  componentDidUpdate(_, prevState){
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

  }

  render() {
    return (
      <div>
        {this.props.currentUser.username}'s portfolio. Your balance: ${this.props.currentUser.balance}
        
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>

        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.errors} <br/>
          <input onChange={this.update('stockTicker')} value={this.state.stockTicker}/> <br/>
          $ {this.props.price}
        </form>
      </div>
    )
  }
}

export default Portfolio;