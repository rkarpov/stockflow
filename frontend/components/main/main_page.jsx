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
    const style = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }

    switch (this.props.location.pathname) {
      case "/transactions":
        return (
        <div style={style}>
            <TransactionIndexContainer/>
            <CreateTransactionContainer/>
          </div>
        )
      case "/portfolio":
        return (
          <div style={style}>
            <StockIndexContainer />
            <CreateTransactionContainer />
          </div>
        )
      case "/chart":
        return (
          <div style={style}>
            <StockShowContainer />
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
        <NavbarContainer />
        {this.RenderComponents()}
      </div>
    )
  }
}

export default Main;