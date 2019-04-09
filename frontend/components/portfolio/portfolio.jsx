import React from 'react';
import Button from '@material-ui/core/Button';


class Portfolio extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        debugger
        return (
            <div>
                users portfolio. Your balance: 
                {this.props.currentUser.balance}
                <Button variant="contained" color="primary" onClick={() => this.props.logout()}>
                    Sign Out
                </Button>
            </div>
        )
    }
}

export default Portfolio;