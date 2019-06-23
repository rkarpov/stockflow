import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


export const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Chart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tickerSymbol: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.requestStockChart(this.state.tickerSymbol)
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  render() {
    const data = this.props.chart.map(datum => {
      return (
        { date: datum.label, Price: datum.close }
      )
    })
    const { classes } = this.props;

    return (
      <main>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h4" color="inherit" className={classes.header} align="left">
            {this.props.company.companyName}
          </Typography>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="Price" domain={['dataMin', 'dataMax']} />
            <Tooltip
              formatter={(value) => {
                let returnVal = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value);
                
                return <span>{returnVal}</span>
              }}
            
              isAnimationActive={false}
              position={{ y: -120, x: 50 }}
            />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} strokeWidth={2} />
          </LineChart>
          <div style={{ marginLeft: 100 }}>
            <label>Search Stock</label>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.update('tickerSymbol')} />
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
          </div>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Chart);