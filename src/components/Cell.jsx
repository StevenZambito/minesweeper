import { Component } from 'react'

export class Cell extends Component {
  render() {
    return <td>{this.props.value}</td>
  }
}
