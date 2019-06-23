import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { requestStockChart } from '../../actions/stock_actions';

const msp = (state) => {
  const chart = state.entities.charts.chart || [{ label: "name", close: "price" }]
  const company = state.entities.charts.quote || { companyName: "Company" }
  return {
    chart: chart,
    company: company
  }
}

const mdp = dispatch => {
  return ({
    requestStockChart: (stockTicker) => dispatch(requestStockChart(stockTicker))
  })
}

export default connect(msp, mdp)(Chart);