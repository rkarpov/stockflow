import { connect } from 'react-redux';
import Searchbar from './searchbar';
import { requestStocks, requestStockChart } from '../../actions/stock_actions';

const msp = state => {
  return {
    stocks: state.ui.search
  }
}

const mdp = dispatch => {
  return {
    requestStocks: (payload) => dispatch(requestStocks(payload)),
    requestStockChart: (chart) => dispatch(requestStockChart(chart))
  }
}

export default connect(msp, mdp)(Searchbar);