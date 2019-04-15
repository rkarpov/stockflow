import React from 'react';
import TransactionFormContainer from '../transactions/transaction_form_container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class Portfolio extends React.Component {
  componentDidMount(){
    this.props.requestStockPortfolio();
  }

  render() {
    return (
      <div>
        {this.props.currentUser.username}'s portfolio. Net worth: {this.props.currentUser.netAssetValue}
        <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
            Sign Out
        </Button>

        <TransactionFormContainer/>
      </div>
    )
  }
}

export default Portfolio;