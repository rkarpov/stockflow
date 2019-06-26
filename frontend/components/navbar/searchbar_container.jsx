import { connect } from 'react-redux';
import Searchbar from './searchbar';
import { requestStocks } from '../../actions/stock_actions';

const msp = state => {
  return {
    stocks: state.ui.search
  }
}

const mdp = dispatch => {
  return {
    requestStocks: (payload) => dispatch(requestStocks(payload))
  }
}

export default connect(msp, mdp)(Searchbar);