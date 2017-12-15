import React, { Component } from 'react';
import Show from './assets/show.jpg';

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h3 className="text-center">Checking for render with hot reloading!!</h3>  
                    <img src={Show} alt="Show image"/>
                </div>
            </div>
        )
    }
}