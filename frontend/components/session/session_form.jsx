import React from 'react';

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
      display: 'block', // Fix IE 11 issue.
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
      width: '100%', // Fix IE 11 issue.
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

  render(){
    const { classes } = this.props;
    debugger
    return(
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.formType}
          </Typography>
          <form onSubmit={this.handleSubmit}>

            {/* <input 
              hidden={this.props.formType === 'Register' ? null : "hidden"}
              type="text" onChange={this.update('username')}
              value={this.state.username}
              placeholder="Name"
            /> */}
            <div hidden={this.props.formType === 'Register' ? null : "hidden"}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Name</InputLabel>
                <Input
                  id="username" name="username"
                  // { this.props.formType === 'Register' ? autoFocus : null}
                  type="text" onChange={this.update('username')}
                  value={this.state.username}
                  placeholder="Name"
                />
              </FormControl>
            </div>
            {/* <input
              type="text" onChange={this.update('email')}
              value={this.state.email}
              placeholder="Email"
            /> */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                autoFocus
                id="email" name="email" 
                autoComplete="email" 
                type="text" onChange={this.update('email')}
                value={this.state.email}
                placeholder="Email"
              />
            </FormControl>

            {/* <input
              type="password" onChange={this.update('password')}
              value={this.state.password}
              placeholder="Password"
            /> */}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              className={classes.submit}         
            >Submit</Button>
            {/* <input type="submit" value={this.props.formType} /> */}

          </form>
        </Paper>
      </main>
    )
  }

}

// export default SessionForm;
export default withStyles(styles)(SessionForm);



function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}
