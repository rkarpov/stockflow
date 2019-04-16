import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from '../components/session/login_form_container';
import SignupFormContainer from '../components/session/signup_form_container';
import Main from '../components/main/main_page';
// import StockIndexContainer from '../components/portfolio/stock_index_container';
// import TransactionIndexContainer from '../components/transaction/transaction_index_container';


const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/" component={LoginFormContainer} />
        <AuthRoute exact path="/register" component={SignupFormContainer} />
        <ProtectedRoute path="/" component={Main} />
        {/* <ProtectedRoute exact path="/portfolio" component={Main} /> */}
        {/* <ProtectedRoute exact path="/portfolio" component={StockIndexContainer} /> */}
        {/* <ProtectedRoute exact path="/transactions" component={TransactionIndexContainer} /> */}
      </Switch>
    </div>
  );
}

export default App;