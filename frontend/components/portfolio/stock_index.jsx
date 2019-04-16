import React from 'react';
import StockIndexItem from './stock_index_item';
import CreateTransactionContainer from '../transactions/create_transaction_container';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class StockIndex extends React.Component {
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

    return (
      <div>
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>
        
        {this.props.currentUser.username}'s portfolio. Net worth: {this.props.currentUser.netAssetValue}
        { stocks }
        <CreateTransactionContainer/>
      </div>
    )
  }
}

export default StockIndex;