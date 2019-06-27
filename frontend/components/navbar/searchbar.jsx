import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { debounce } from "throttle-debounce";
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    height: 35,
    marginRight: 12,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '', selectedValue: 'company'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debouncedStockSearch = debounce(500, () =>
      this.props.requestStocks({ 
        string: this.state.searchString, 
        value: this.state.selectedValue })
      )
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchString !== this.state.searchString || prevState.selectedValue !== this.state.selectedValue) {
      this.debouncedStockSearch()
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ selectedValue: e.target.value });
  };
  
  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let stock = Object.values(this.props.stocks).filter(stock => {
      return stock[this.state.selectedValue].toUpperCase() === this.state.searchString.toUpperCase();
    })
    stock = Object.values(stock)[Object.keys(stock)] || { ticker: '' }; 
    const ticker = stock.ticker;
    ticker === '' ? null : (
      this.props.requestStockChart({ tickerSymbol: ticker, dateRange: '1m' }),
      this.props.history.push({
        pathname: '/chart',
        state: { tickerSymbol: ticker }
      })
    );
  }

  render(){
    const { classes } = this.props;

    return(
      <div style={{ marginLeft: 100 }}>
        <form onSubmit={this.handleSubmit} style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'Search Stock' }}
              onChange={this.update('searchString')}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          {/* <button type="submit" style={{ width: 70, height: 30, background: '#3f51b5', color: '#fff', borderRadius: 3, fontSize: 14 }}>Search</button> */}
          </Paper>
          <div style={{ marginRight: 250, minWidth: 240 }}>
            <label style={{ marginTop: 5 }}>Search Stock By</label>
            <div>
              <label>Company:</label>
              <Checkbox style={{ height: 20 }} checked={this.state.selectedValue === 'company'} onChange={this.handleChange} value="company" />
              <label>Ticker:</label>
              <Checkbox style={{ height: 20 }} checked={this.state.selectedValue === 'ticker'} onChange={this.handleChange} value="ticker" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Searchbar);

