import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
    this.state = { value: 0 };
  }

  render(){
    const { classes } = this.props;
    const linkToPortfolio = props => <RouterLink to="/portfolio" {...props} />
    const linkToTransactions = props => <RouterLink to="/transactions" {...props} />

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              TTP-FS
            </Typography>
            {/* <Button color="inherit">Logout</Button> */}
            <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
              Sign Out
            </Button>


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
