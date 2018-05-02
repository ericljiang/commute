import React, { Component } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete.js';

export default class AddCommuteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    }
  }

  updateAddress = (address) => {
    this.setState({ address: address });
  }

  addCommute = () => {
    this.props.onAddCommute(this.state.address);
  }

  render() {
    return (
      <div>
        <PlacesAutocomplete onSelect={this.updateAddress} />
        <button disabled={!this.state.address} onClick={this.addCommute}>
          Add commute
        </button>
      </div>
    );
  }
}
