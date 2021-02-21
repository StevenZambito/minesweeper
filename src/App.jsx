import { Component } from 'react'
import { Cell } from './components/Cell'
import axios from 'axios'

export class App extends Component {
  state = {
    id: 1,
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
    mines: 10,
    gameState: 'new',
    face: '🙂',
    seconds: 0,
    timerVar: 1,
  }

  componentDidMount = () => {
    this.newGame()
  }

  newGame = async () => {
    this.stopTimer()
    await axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0,
      })
      .then((response) => {
        this.setState({
          id: response.data.id,
          board: response.data.board,
          mines: response.data.mines,
          gameState: response.data.state,
          face: '🙂',
          seconds: 0,
        })
      })
  }

  startTimer = () => {
    const localTimerVar = setInterval(() => {
      // @ts-ignore
      this.setState(({ seconds }) => ({ seconds: seconds + 1 }))
    }, 1000)
    this.setState({ timerVar: localTimerVar })
  }

  stopTimer = () => {
    clearInterval(this.state.timerVar)
  }

  /**
   * @param {any} rowIndex
   * @param {any} colIndex
   */
  handleClickCell = async (rowIndex, colIndex) => {
    if (this.state.gameState === 'won' || this.state.gameState === 'lost') {
      return
    }
    if (this.state.seconds === 0) {
      this.startTimer()
    }

    await axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        {
          row: rowIndex,
          col: colIndex,
        }
      )
      .then((response) => {
        this.setState({
          board: response.data.board,
          gameState: response.data.state,
        })
        this.determineFace()

        if (this.state.gameState === 'lost') {
          this.stopTimer()
        }
      })
  }

  /**
   * @param {{ preventDefault: () => void; }} event
   * @param {any} rowIndex
   * @param {any} colIndex
   */
  handleRightClickCell = async (event, rowIndex, colIndex) => {
    event.preventDefault()
    if (this.state.mines <= 0) {
      return
    }

    if (this.state.gameState === 'won' || this.state.gameState === 'lost') {
      return
    }

    await axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        {
          row: rowIndex,
          col: colIndex,
        }
      )
      .then((response) => {
        this.setState({
          board: response.data.board,
          mines: response.data.mines,
        })
      })
  }

  determineFace = () => {
    if (this.state.gameState === 'new' || this.state.gameState === 'playing') {
      this.setState({ face: '🙂' })
    } else if (this.state.gameState === 'won') {
      this.setState({ face: '🥳' })
    } else if (this.state.gameState === 'lost') {
      this.setState({ face: '😵' })
    }
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
                {this.state.mines}
              </td>
              <td className="table-header-row" align="center" colSpan={2}>
                <button className="sweeper-button" onClick={this.newGame}>
                  {this.state.face}
                </button>
              </td>
              <td className="timer" colSpan={3}>
                {this.state.seconds}
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => {
                    return (
                      <Cell
                        key={colIndex}
                        value={cell}
                        onClick={() => this.handleClickCell(rowIndex, colIndex)}
                        // @ts-ignore
                        onContextMenu={(event) =>
                          this.handleRightClickCell(event, rowIndex, colIndex)
                        }
                      />
                    )
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
