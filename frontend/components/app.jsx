import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from '../components/session/login_form_container';
import SignupFormContainer from '../components/session/signup_form_container';
import PortfolioIndexContainer from '../components/portfolio/portfolio_index_container';

const App = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path="/" component={LoginFormContainer} />
                <AuthRoute exact path="/register" component={SignupFormContainer} />
                <ProtectedRoute exact path="/index" component={PortfolioIndexContainer} />
            </Switch>
        </div>
    );
}

export default App;