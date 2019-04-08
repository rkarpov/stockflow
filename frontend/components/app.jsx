import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path="/" component={SessionFormContainer} />
                <ProtectedRoute exact path="/index" component={PortfolioIndexContainer} />
            </Switch>
        </div>
    );
}

export default App;