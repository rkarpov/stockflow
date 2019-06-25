import { requestStocks } from '../../actions/stock_actions';
import { connect } from 'react-redux';
import Searchbar from './searchbar';

const msp = state => {

}

const mdp = dispatch => {
  return {
    requestStocks: (payload) => dispatch(requestStocks(payload))
  }
}

export default connect(msp, mdp)(Searchbar);