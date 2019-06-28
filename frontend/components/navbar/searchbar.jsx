import React from "react";
import { withRouter, Link as RouterLink } from 'react-router-dom';
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

const ClickOutHandler = require('react-onclickout');

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchString: '', selectedValue: 'company',
      showSuggestions: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debouncedStockSearch = debounce(500, () =>
      this.props.requestStocks({ 
        string: this.state.searchString, 
        value: this.state.selectedValue })
      )
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
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
      this.setState({ 
        [field]: e.target.value,        
        showSuggestions: true,
        searchString: e.currentTarget.value,
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({
      showSuggestions: false
    })

    let stock = Object.values(this.props.stocks).filter(stock => {
      return stock[this.state.selectedValue].toUpperCase() === this.state.searchString.toUpperCase();
    })
    stock = Object.values(stock)[Object.keys(stock)] || { ticker: '' }; 
    const ticker = stock.ticker;

    ticker === '' ? null : (
      this.props.setStockchartParams({ ticker: ticker }),
      this.props.history.push({
        pathname: '/chart'
      })
    );
  }

  onClick(e) {
    const text = e.currentTarget.innerText;
    const string = (this.state.selectedValue === 'ticker')
                  ? text.slice(0, text.indexOf('-') - 1)
                  : text.slice(text.indexOf('-') + 2)
    return this.setState({      
      showSuggestions: false,
      searchString: string
    });
  };

  onClickOut(e) {
    this.setState({
      showSuggestions: false
    });
  }

  render(){
    const { classes } = this.props;
  
    const suggestionsListComponent = Object.values(this.props.stocks).map((stock, idx) => {
      return (
        <button 
          key={`search-${idx}`}
          className={`${classes.root} searchResult`}
          onClick={this.onClick} >
          {`${stock.ticker} - ${stock.company}`}
        </button>
      )
    })

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
              type="text"
              value={this.state.searchString}
            ></InputBase>
            <IconButton type="submit" className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <ClickOutHandler onClickOut={() => this.onClickOut()}>
            <div 
              style={{ position: 'absolute', top: 47, maxHeight: 105, width: 300, overflow: 'auto', borderBottom: 'solid 1px #bababa' }}
              hidden={this.state.showSuggestions ? null : 'hidden'}
            >
              {suggestionsListComponent}
            </div>
          </ClickOutHandler>
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

export default withRouter(withStyles(styles)(Searchbar));

