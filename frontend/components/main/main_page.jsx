import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import StockIndexContainer from '../portfolio/stock_index_container';
import CreateTransactionContainer from '../transaction/create_transaction_container';
import TransactionIndexContainer from '../transaction/transaction_index_container';
import StockShowContainer from '../portfolio/stock_show_container';

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
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <StockShowContainer 
              tickerSymbol={this.props.location.tickerSymbol || this.props.history.location.state.tickerSymbol}
              company={this.props.location.company}
              stockId={this.props.location.stockId}
            />
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
        <NavbarContainer 
          history={this.props.history}
        />
        {this.RenderComponents()}
      </div>
    )
  }
}

export default Main;