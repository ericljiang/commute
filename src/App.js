import React, { Component } from 'react';
import './App.css';
import PlacesAutocomplete from './PlacesAutocomplete.js';
import Commutes from './Commutes.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      origin: null,
    }
  }

  updateOrigin = (address) => {
    this.setState({ origin: address });
  }

  render() {
    return (
      <div className="App">
        <div className="Origin">
          <h1>Origin</h1>
          <PlacesAutocomplete onSelect={this.updateOrigin} />
        </div>
        <div className="Commutes">
          <h1>Commutes</h1>
          <Commutes origin={this.state.origin} />
        </div>
      </div>
    );
  }
}

export default App;
