import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <BrowserRouter>
          {/* BrowserRouter requires only one child */}
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/settings" component={Settings} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
