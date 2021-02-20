import React, { Component } from 'react'
import { Cell } from './components/Cell'
import axios from 'axios'
const board = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]
export class App extends Component {
  newGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0,
      })
      .then((response) => console.log(response.data))
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
            {board.map((row, rowIndex) => {
              return (
                <tr>
                  {' '}
                  {row.map((col, colIndex) => {
                    return <Cell />
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
