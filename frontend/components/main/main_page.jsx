import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import StockIndexContainer from '../portfolio/stock_index_container';
import CreateTransactionContainer from '../transaction/create_transaction_container';
import TransactionIndexContainer from '../transaction/transaction_index_container';

class Main extends React.Component {
  constructor(props){
    super(props)
    this.method = this.method.bind(this);
  }

  method(){
    debugger
    switch (this.props.location.pathname) {
      case "/transactions":
        return (
          <div>
            <TransactionIndexContainer/>)
          </div>
        )
      case "/portfolio":
        return (
          <div>
            <StockIndexContainer />
            <CreateTransactionContainer />
          </div>
        )
      default:
        return "Page not found";
    }
  }

  render(){
    return(
      <div>
        <NavbarContainer/>
        {this.method()}
      </div>
    )
  }
}

export default Main;