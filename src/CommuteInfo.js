import React, { Component } from 'react';

export default class CommuteInfo extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.destination}</h3>
        <p>Time: {this.props.time}</p>
        <button onClick={() => this.props.onDelete(this.props.index)}>Delete</button>
      </div>
    );
  }
}
