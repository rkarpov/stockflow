import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { fetchChartData } from '../../actions/stock_actions';

const msp = (state) => {
  
}

const mdp = dispatch => {
  return ({
    fetchChartData = () => dispatch(fetchChartData(stockTicker))
  })
}

export default connect(msp, mdp)(Chart);