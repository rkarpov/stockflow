import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


export const styles = theme => ({
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
      selected: '1m'
      // tickerSymbol: '', selected: '1d'
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.selected = this.selected.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.getChart = this.getChart.bind(this);
  }

  componentDidMount(){
    this.setState({ tickerSymbol: this.props.tickerSymbol });
    this.getChart(this.props.tickerSymbol); // state not immediately set, request chart using props during first time loading page
  }

  componentDidUpdate(_, prevState){
    if (prevState.selected !== this.state.selected){
      this.getChart(this.props.tickerSymbol);
      // this.getChart(this.state.tickerSymbol);
    }
  }

  // handleSubmit(e){
  //   e.preventDefault();
  //   this.getChart(this.state.tickerSymbol);
  // }

  getChart(tickerSymbol){
    this.props.requestStockChart({ tickerSymbol: tickerSymbol, dateRange: this.state.selected });
  }

  // update(field) {
  //   return (e) => {
  //     this.setState({ [field]: e.target.value });
  //   }
  // }

  selected(range){
    return this.state.selected === range ? { background: '#3f51b5', color: '#fff' } : null;
  }

  updateSelected = (range) => () => {
    return this.setState({ selected: range })
  }

  render() {
    const data = this.props.chart.map(datum => {
      return (
        { Date: datum.label, Price: datum.close }
      )
    })
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h4" color="inherit" className={classes.header} align="left">
            {this.props.company}
          </Typography>
          <LineChart
            width={600}
            height={350}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis dataKey="Price" domain={['dataMin', 'dataMax']} />
            <Tooltip
              formatter={(value) => {
                let returnVal = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value);
                return <span>{returnVal}</span>
              }}
            />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} strokeWidth={2} />
          </LineChart>
          <div style={{ marginBottom: 5 }}>
            <Button style={this.selected('1y')} onClick={this.updateSelected('1y')}>1 Y</Button>
            <Button style={this.selected('3m')} onClick={this.updateSelected('3m')}>3 M</Button>
            <Button style={this.selected('1m')} onClick={this.updateSelected('1m')}>1 M</Button>
            <Button style={this.selected('7d')} onClick={this.updateSelected('7d')}>1 W</Button>
            <Button style={this.selected('1d')} onClick={this.updateSelected('1d')}>1 D</Button>
          </div>
          {/* <div style={{ marginLeft: 100 }}>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.update('tickerSymbol')} placeholder={"Search Stock"}/>
              <button type="submit" style={{ width: 70, height: 30, background: '#3f51b5', color: '#fff', borderRadius: 3, fontSize: 14 }}>Submit</button>
            </form>
          </div> */}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Chart);