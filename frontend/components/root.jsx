import App from './app';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';



const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App store={store} />
        </HashRouter>
    </Provider>
);

export default Root;