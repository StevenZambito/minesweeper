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

  render() {
    return (
      <td onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
        {this.determineSymbol()}
      </td>
    )
  }
}
