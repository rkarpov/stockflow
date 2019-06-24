import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { requestStockChart } from '../../actions/stock_actions';

const msp = (state) => {
  const data = state.entities.charts;
  const chart = (Object.keys(data).length === 0 && data.constructor === Object) ? [{ label: "name", close: "price" }] : Object.values(data);
  const company = state.entities.stocks.companyName || "Company";
  return {
    chart: chart,
    company: company
  }
}

const mdp = dispatch => {
  return ({
    requestStockChart: (payload) => dispatch(requestStockChart(payload))
  })
}

export default connect(msp, mdp)(Chart);