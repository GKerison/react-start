import React, {Component} from 'react';

import Header from './componet/Header';
import Game from './componet/Game';

import './css/Main.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
