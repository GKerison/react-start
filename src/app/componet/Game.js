import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/Game.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {

  static propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func,
  }

  render() {
    return (
      <div className="game-board">
        <div className="board-row">
          {this._renderSquare(0)}
          {this._renderSquare(1)}
          {this._renderSquare(2)}
        </div>
        <div className="board-row">
          {this._renderSquare(3)}
          {this._renderSquare(4)}
          {this._renderSquare(5)}
        </div>
        <div className="board-row">
          {this._renderSquare(6)}
          {this._renderSquare(7)}
          {this._renderSquare(8)}
        </div>
      </div>
    );
  }

  _renderSquare(i) {
    const {squares, onClick}= this.props;
    if (!squares) {
      return null;
    }
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick && onClick(i)}
      />
    );
  }
}

class Info extends Component {

  static propTypes = {
    winner: PropTypes.string,
    tips: PropTypes.string,
    steps: PropTypes.array,
    onStepClick: PropTypes.func,
  }

  render() {
    const {winner, tips, steps} = this.props;

    if (winner) {

      return (
        <div className="game-info">
          <h3>{`${winner}赢啦~\\(≧▽≦)/~`}</h3>
        </div>
      )
    }

    return (
      <div className="game-info">
        <div>{tips}</div>
        <ul>
          {steps && steps.map(this._renderStepItem.bind(this))}
        </ul>
      </div>
    );
  }

  _renderStepItem(squares, step) {
    const {onStepClick} = this.props;
    const desc = step ? `第${step}步` : "游戏开始";
    return (
      <li key={step}>
        <button className="step" onClick={() => onStepClick && onStepClick(step)}>{desc}</button>
      </li>
    );
  }
}

/**
 * 简单的三子棋，默认X先手
 */
class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      win: false,
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this._calculateWinner(current.squares);
    const tips = `本轮：${this.state.xIsNext ? "X" : "O" }`;

    return (
      <div className="game">
        <Board squares={current.squares} onClick={(step) => this._onNextClick(step)}/>
        <Info winner={winner} tips={tips} steps={history} onStepClick={(step) => this._jumpTo(step)}/>
      </div>
    );
  }

  /**
   * 计算是否赢了
   * @param squares
   * @returns {*}
   * @private
   */
  _calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  /**
   * 下棋之后
   * @param pos 棋子的未知
   * @private
   */
  _onNextClick(pos) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this._calculateWinner(squares) || squares[pos]) {
      return;
    }
    squares[pos] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  /**
   * 回到第几步
   * @param step
   * @private
   */
  _jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
}

export default Game;