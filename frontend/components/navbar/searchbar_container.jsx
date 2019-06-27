import { connect } from 'react-redux';
import Searchbar from './searchbar';
import { requestStocks, requestStockChart } from '../../actions/stock_actions';

const msp = (state, ownProps) => {
  const stocks = (state.ui.search && state.ui.search[0] ? state.ui.search : { 0: { company: '', ticker: '' }});
  return {
    stocks: stocks,
    history: ownProps.history,
  }
}

const mdp = dispatch => {
  return {
    requestStocks: (payload) => dispatch(requestStocks(payload)),
    requestStockChart: (chart) => dispatch(requestStockChart(chart))
  }
}

export default connect(msp, mdp)(Searchbar);