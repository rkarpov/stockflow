import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class Transactions extends React.Component {
  constructor(props) {
  }

  componentDidMount() {
    this.props.requestTransactions();
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Transactions;