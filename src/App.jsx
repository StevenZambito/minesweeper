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
    difficulty: 0,
    colSpan: 3,
    hasTimerStarted: false,
  }

  componentDidMount = () => {
    this.newGame(this.state.difficulty)
  }

  determineMargin = () => {
    if (this.state.difficulty === 2) {
      return 'hard-margin'
    }
    return ''
  }

  /**
   * @param {any} chosenDifficulty
   */
  newGame = async (chosenDifficulty) => {
    this.stopTimer()
    this.setState({ hasTimerStarted: false })
    await axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: chosenDifficulty,
      })
      .then((response) => {
        this.setState({
          id: response.data.id,
          board: response.data.board,
          mines: response.data.mines,
          gameState: response.data.state,
          face: '🙂',
          seconds: 0,
          difficulty: chosenDifficulty,
        })
        this.determineColSpan()
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
   * @param {string} value
   */
  handleClickCell = async (rowIndex, colIndex, value) => {
    if (this.state.gameState === 'won' || this.state.gameState === 'lost') {
      return
    }
    if (value === 'F') {
      return
    }
    if (this.state.hasTimerStarted === false) {
      this.startTimer()
      this.setState({ hasTimerStarted: true })
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

        if (this.state.gameState === 'lost' || this.state.gameState === 'won') {
          this.stopTimer()
        }
        if (this.state.gameState === 'won') {
          this.setState({ mines: 0 })
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

  determineColSpan = () => {
    if (this.state.difficulty === 0) {
      this.setState({ colSpan: 3 })
    } else if (this.state.difficulty === 1) {
      this.setState({ colSpan: 7 })
    } else {
      this.setState({ colSpan: 11 })
    }
  }

  render() {
    return (
      <main className={this.determineMargin()}>
        <div className="button-difficulty">
          <button onClick={() => this.newGame(0)}>Easy</button>
          <button onClick={() => this.newGame(1)}>Medium</button>
          <button onClick={() => this.newGame(2)}>Hard</button>
        </div>

        <table className="sweeper-table">
          <thead>
            <tr className="table-header">
              <td className="mine-number" colSpan={this.state.colSpan}>
                {this.state.mines}
              </td>
              <td className="table-header-row" align="center" colSpan={2}>
                <button
                  className="sweeper-button"
                  onClick={() => this.newGame(this.state.difficulty)}
                >
                  {this.state.face}
                </button>
              </td>
              <td className="timer" colSpan={this.state.colSpan}>
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
                        onClick={() =>
                          this.handleClickCell(rowIndex, colIndex, cell)
                        }
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
