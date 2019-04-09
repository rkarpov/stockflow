import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>users portfolio. Your balance: 
            {this.props.currentUser.balance
            }</div>
        )
    }
}

export default Portfolio;