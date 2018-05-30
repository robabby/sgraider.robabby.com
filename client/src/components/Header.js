import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

class Header extends Component {
  renderNavigation() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <nav>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </nav>
        );
      default:
        return (
          <nav>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </nav>
        );
    }
  }

  render() {
    return (
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Welcome to SpaceGhost Alliance</h1>
        {this.renderNavigation()}
      </header>
    );
  }
}

// { auth } is destructured out of /state/
function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);
