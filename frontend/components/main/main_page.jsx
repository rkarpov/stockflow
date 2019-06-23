import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import StockIndexContainer from '../portfolio/stock_index_container';
import CreateTransactionContainer from '../transaction/create_transaction_container';
import TransactionIndexContainer from '../transaction/transaction_index_container';
import Chart from '../portfolio/stock_show';

class Main extends React.Component {
  constructor(props){
    super(props)
    this.RenderComponents = this.RenderComponents.bind(this);
  }

  RenderComponents(){
    switch (this.props.location.pathname) {
      case "/transactions":
        return (
          <div>
            <TransactionIndexContainer/>
          </div>
        )
      case "/portfolio":
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <StockIndexContainer />
            <CreateTransactionContainer />
          </div>
        )
      case "/chart":
        return (
          <Chart/>
        )
      default:
        return "Page not found";
    }
  }

  render(){
    return(
      <div>
        <NavbarContainer/>
        {this.RenderComponents()}
      </div>
    )
  }
}

export default Main;