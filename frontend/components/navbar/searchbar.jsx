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
    height: 40,
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
      tickerSymbol: '', selectedValue: 'company'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debouncedStockSearch = debounce(500, this.props.requestStocks)
    this.handleChange = this.handleChange.bind(this)
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
    // const searchResult = this.debouncedStockSearch();
    this.props.fetchStocks();
    // searchResult ? redirect to or <Link to={ { pathname: "/chart", stockTicker: searchResult.stockTicker }}/>
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
              inputProps={{ 'aria-label': 'Search Google Maps' }}
            />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          {/* <input onChange={this.update('tickerSymbol')} placeholder={"Search Stock"} /> */}
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

// export default Searchbar;
export default withStyles(styles)(Searchbar);

