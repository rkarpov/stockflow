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

  componentDidUpdate(prevProps, prevState){
    if (prevState.stockTicker != this.state.stockTicker) {
      this.props.requestStockPrice(this.state.stockTicker)
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  render() {
    return (
      <div>
        users portfolio. Your balance: 
        {this.props.currentUser.balance}
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>

        <form>
          <input onChange={this.update('stockTicker')} value={this.state.stockTicker}/>
          {this.props.price}
        </form>
      </div>
    )
  }
}

export default Portfolio;