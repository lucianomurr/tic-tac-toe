import React from 'react';
import CalculateWinner from '../utils/calculateWinner';
import Square from './square';


const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null
};
  
export default class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;
  }

  handleClick(i){
    if (this.winner){
      return;
    }
    const squares = this.state.squares.slice();
    if (squares[i] === null){ 
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        ...this.state,
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    } else {
      console.log(`position ${i} is already taken by ${squares[i]}`)
    }
  }

  newGame(){
    this.setState(initialState);
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />;
  }

  render() {
    this.winner = CalculateWinner(this.state.squares);

    let status;
    if (this.winner){
      status = `Winner ${this.winner}`;
    }
    else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button 
          onClick={ () => this.newGame()}>
          new game
        </button>
      </div>
    );
  }
}