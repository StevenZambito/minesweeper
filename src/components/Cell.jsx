import { Component } from 'react'

export class Cell extends Component {
  determineSymbol = () => {
    if (this.props.value === '_') {
      return ' '
    } else if (this.props.value === 'F' || this.props.value === '@') {
      return '🚩'
    } else if (this.props.value === '*') {
      return '💣'
    } else {
      return this.props.value
    }
  }

  determineCoverage = () => {
    if (this.props.value === ' ' || this.props.value === 'F') {
      return 'dark-grey'
    }
    return 'light-grey'
  }

  render() {
    return (
      <td
        onClick={this.props.onClick}
        onContextMenu={this.props.onContextMenu}
        className={this.determineCoverage()}
      >
        {this.determineSymbol()}
      </td>
    )
  }
}
