import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

export default (props) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to SGRaider</h1>
      <nav>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </nav>
    </header>
  )
}
