import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Searchbar from './searchbar';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    margin: theme.spacing.unit,
    color: "#fafafa",
  },
});

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(){
    const { classes } = this.props;
    const linkToPortfolio = props => <RouterLink to="/portfolio" {...props} />
    const linkToTransactions = props => <RouterLink to="/transactions" {...props} />
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
          <MenuItem onClick={this.handleClose}>Cancel</MenuItem>
        </Menu>

        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow} style={{ marginLeft: 25 }}>
              Stockflow
            </Typography>
            <Searchbar/>
            <Link component={linkToPortfolio} className={classes.link}>
              Portfolio
            </Link>
            <Link component={linkToTransactions} className={classes.link}>
              Transactions
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}

export default withStyles(styles)(Navbar);
