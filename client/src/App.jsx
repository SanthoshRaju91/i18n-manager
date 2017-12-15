import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';

import Show from './assets/show.jpg';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Checking for render!!</h1>
                <img src={Show} alt="Show image"/>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
);
