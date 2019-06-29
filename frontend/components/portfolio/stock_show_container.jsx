import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { requestStockChart, setStockchartParams } from '../../actions/stock_actions';

const msp = (state) => {
  const tickerSymbol = state.ui.stockchartParams.ticker
  const range = state.ui.stockchartParams.range;
  const data = state.entities.charts.chart;
  const chart = (Object.keys(data).length === 0 && data.constructor === Object) ? [{ label: "name", close: "price" }] : Object.values(data);
  const company = state.entities.charts.quote.companyName || "Company";
  return {
    chart,
    company,
    tickerSymbol,
    range,
  }
}

const mdp = dispatch => {
  return ({
    requestStockChart: (payload) => dispatch(requestStockChart(payload)),
    setStockchartParams: (params) => dispatch(setStockchartParams(params))
  })
}

export default connect(msp, mdp)(Chart);