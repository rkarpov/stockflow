import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class StockIndexItem extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  performance(val){
    // open price <=> current price
    switch (val) {
      case -1:
        return "green"
      case 0:
        return "grey"
      case 1:
        return "red"
    }
  }

  handleSubmit(){
    this.props.setStockchartParams({ ticker: this.props.stock.ticker_symbol})
    this.props.history.push('/chart');
  }

  render() {
    const val = this.performance(this.props.stock.performance)
    return (
      <TableRow>
          <TableCell align="center">
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="button" style={{ color: val, textDecoration: 'none' }}>
                {this.props.stock.ticker_symbol}
              </button>
            </form>
          </TableCell>
          <TableCell align="center">
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="button">
                {this.props.stock.company}
              </button>
            </form>
          </TableCell>
        <TableCell align="center">{this.props.stock.numShares}</TableCell>
        <TableCell style={{ color: val }} align="center">{this.props.stock.netStockValue}</TableCell>
      </TableRow>
    )
  }

}

export default withRouter(StockIndexItem);