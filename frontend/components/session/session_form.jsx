import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


export const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.credentials;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameField = this.usernameField.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
  }

  update(field) {
    return (e) => {
        this.setState({ [field]: e.target.value });
    }
  }

  usernameField(){
    if (this.props.formType === 'Register') {
      return(
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Name</InputLabel>
          <Input
            id="username" name="username"
            autoFocus
            type="text" onChange={this.update('username')}
            value={this.state.username}
            placeholder="Name"
          />
        </FormControl >
      )
    } else {
      return null
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.formType}
          </Typography>
          <form onSubmit={this.handleSubmit}>
            {this.usernameField()}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email" name="email" 
                autoComplete="email" autoFocus
                type="text" onChange={this.update('email')}
                value={this.state.email}
                placeholder="Email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                name="password" type="password"
                id="password" autoComplete="current-password"
                onChange={this.update('password')}
                value={this.state.password}
                placeholder="Password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <label style={{float: "right", marginTop: "15px"}}>{this.props.formType === "Register" ? "Have an account? " : "Don't have an account? "}
            <Link
              to={this.props.formType === "Register" ? "/" : "register"}>
              {this.props.formType === "Register" ? "Sign In" : "Register"}
            </Link>
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              className={classes.submit}         
            >Submit</Button>

          </form>
        </Paper>
      </main>
    )
  }

}

export default withStyles(styles)(SessionForm);