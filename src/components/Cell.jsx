import { Component } from 'react'

export class Cell extends Component {
  render() {
    return <td onClick={this.props.onClick}>{this.props.value}</td>
  }
}
