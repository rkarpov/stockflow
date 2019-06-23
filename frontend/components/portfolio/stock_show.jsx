import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    // let data = []
    // this.props.chart.forEach(datum => {
    //   data.push(
    //     { name: datum.label, close: datum.close }
    //   )
    // })
    const data = this.props.chart.map(datum => {
      return (
        { date: datum.label, Price: datum.close }
      )
    })

    return (
      <div>
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
          <YAxis dataKey="Price" />
          {/* <Tooltip /> */}
          <Tooltip
            // contentStyle={{ backgroundColor: 'transparent', border: '0' }}

            formatter={(value) => {
              let returnVal = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value);
              
              return <span className="chart-time" >{returnVal}</span>
            }}
           
            // isAnimationActive={false} position={{ y: 270 }} offset={-60}
          />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        <div style={{ marginLeft: 100 }}>
          <label>Search Stock</label>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.update('tickerSymbol')}></input>
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default Chart;