import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import StockIndexContainer from '../portfolio/stock_index_container';
import CreateTransactionContainer from '../transaction/create_transaction_container';
import TransactionIndexContainer from '../transaction/transaction_index_container';
import StockShowContainer from '../portfolio/stock_show_container';

class Main extends React.Component {
  constructor(props){
    super(props)
    this.RenderComponent = this.RenderComponent.bind(this);
  }

  RenderComponent(){
    switch (this.props.location.pathname) {
      case "/transactions":
        return (
          <TransactionIndexContainer/>
        )
      case "/portfolio":
        return (
          <StockIndexContainer />
        )
      case "/chart":
        return (
          <StockShowContainer />
        )
      default:
        return "Page not found";
    }
  }

  render(){
    return(
      <div>
        <NavbarContainer />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {this.RenderComponent()}
          <CreateTransactionContainer/>
        </div>
      </div>
    )
  }
}

export default Main;