import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {/* BrowserRouter requires only one child */}
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={LoginForm} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
