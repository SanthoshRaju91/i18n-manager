import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';

import Show from './assets/show.jpg';

class App extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h3 className="text-center">Checking for render!!</h3>  
                    <img src={Show} alt="Show image"/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
);
