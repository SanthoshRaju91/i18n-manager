import React from 'react';
import { render } from 'react-dom';
import './styles/app.scss';
import App from './App';

const renderApp = (Application) => {
    render(
        <Application></Application>,
        document.getElementById('app')
    )
}

renderApp(App);

// hot module reloading
if(module.hot) {    
    module.hot.accept('./App', () => {
        const App = require('./App').default;
        renderApp(App);
    });
}
