import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { requestStockChart } from '../../actions/stock_actions';

const msp = (state) => {
  return {
    state: state
  }
}

const mdp = dispatch => {
  return ({
    requestStockChart: (stockTicker) => dispatch(requestStockChart(stockTicker))
  })
}

export default connect(msp, mdp)(Chart);