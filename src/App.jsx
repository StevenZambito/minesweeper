import React, { Component } from 'react'
import { Cell } from './components/Cell'
import axios from 'axios'

export class App extends Component {
  state = {
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
  }
  newGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0,
      })
      .then((response) => {
        console.log(response.data)
        this.state.board = response.data.board
      })
  }
  render() {
    return (
      <main>
        <div className="button-difficulty">
          <button>Easy</button>
          <button>Medium</button>
          <button>Hard</button>
        </div>

        <table className="sweeper-table">
          <thead>
            <tr className="table-header">
              <td className="mine-number" colSpan={3}>
                10
              </td>
              <td className="table-header-row" align="center" colSpan={2}>
                <button className="sweeper-button" onClick={this.newGame}>
                  🙂
                </button>
              </td>
              <td className="timer" colSpan={3}>
                0
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => {
                    return <Cell key={colIndex} />
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    )
  }
}
