import React from 'react';
import { connect } from 'react-redux';
import Chart from './stock_show';
import { requestStockChart, setStockchartParams } from '../../actions/stock_actions';

function filterChartRange(chart, selectedRange){
  let date = new Date();
  switch (selectedRange) {
    case '7d':
      return chart.reduceRight((acc, ele) => acc.length < 7 ? [ele, ...acc] : acc, []);
    case '14d':
      return chart.reduceRight((acc, ele) => acc.length < 14 ? [ele, ...acc] : acc, []);
    case '1m':
      date.setMonth(date.getMonth() - 1);
      return chart.reduceRight((acc, ele) => new Date(ele.date) > date ? [ele, ...acc] : acc, []);
    case '3m':
      date.setMonth(date.getMonth() - 3);
      return chart.reduceRight((acc, ele) => new Date(ele.date) > date ? [ele, ...acc] : acc, []);
    default:
      return chart
  }
}

const msp = (state) => {
  const tickerSymbol = state.ui.stockchartParams.ticker
  const range = state.ui.stockchartParams.range;
  const chart_data = state.entities.charts;
  const data = range === '1d' ? chart_data.day : chart_data.year; // iex api charges for 1d data, consider alternative chart source
  let chart = (Object.keys(data).length === 0 && data.constructor === Object) ? [{ label: "name", close: "price" }] : Object.values(data);
  chart = filterChartRange(chart, state.ui.stockchartParams.range);
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