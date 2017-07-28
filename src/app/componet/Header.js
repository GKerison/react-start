import React, {Component} from 'react';
import logo from './res/images/logo.svg';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <img src={logo} className="header-logo" alt="logo"/>
        <h2>Welcome to Tic Tac Toe</h2>
      </div>
    );
  }
}

export default Header