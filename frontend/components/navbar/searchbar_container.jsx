import { connect } from 'react-redux';
import Searchbar from './searchbar';
import { requestStocks, requestStockChart, setStockchartParams } from '../../actions/stock_actions';

const msp = (state, ownProps) => {
  const stocks = (state.ui.search && state.ui.search[0] ? state.ui.search : { 0: { company: '', ticker: '' }});
  // const filteredSuggestions = Object.values(state.ui.search).map((stock) => {
  //     return (stock.company);
  //   })
  return {
    stocks: stocks,
    // filteredSuggestions
  }
}

const mdp = dispatch => {
  return {
    requestStocks: (payload) => dispatch(requestStocks(payload)),
    requestStockChart: (chart) => dispatch(requestStockChart(chart)),
    setStockchartParams: (params) => dispatch(setStockchartParams(params))
  }
}

export default connect(msp, mdp)(Searchbar);