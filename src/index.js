import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import { INITIAL_STATE } from './utils/gameInitialState';
import CalculateWinner from './utils/calculateWinner';
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = INITIAL_STATE;
    console.log(this.state);
  }

  handleClick(i){
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();

    if (CalculateWinner(squares).player || squares[i]){
      return
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
    
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = CalculateWinner(current.squares);
    const moves = history.map( (step, move) => {
      const desc = move ? 'Go to move#' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={ () => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner.player){
      status = `Winner ${winner.player}`;
    }
    else if (!winner && this.state.stepNumber === 9){
      status = 'Nessun vincitore!'
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={ (i) => this.handleClick(i)}
            lines={winner.elements}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  