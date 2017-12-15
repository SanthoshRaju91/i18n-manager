import React from 'react';
import Responsive from 'react-responsive';
import { render } from 'react-dom';
import './styles/app.scss';
import App from './App';

const SupportedView = props => <Responsive { ...props } minWidth={960}/>;
const UnSupportedView = props => <Responsive { ...props } maxWidth={960}/>;

const renderApp = (Application) => {
    render(
        <div>
            <SupportedView>
                <Application></Application>
            </SupportedView>

            <UnSupportedView>
                <h1>This is tablet /mobile view, which is not supported.</h1>
            </UnSupportedView>
        </div>,
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
