import React, { Component } from 'react';
import './App.css';
import PlacesAutocomplete from './PlacesAutocomplete.js';
import Commutes from './Commutes.js';
import AddCommuteButton from './AddCommuteButton.js';
import Map from './Map.js';

class App extends Component {
  constructor() {
    super();
    var destinations = this.loadDestinations();
    this.state = {
      origin: null,
      destinations: destinations ? destinations : []
    }
  }

  updateOrigin = (address) => {
    this.setState({ origin: address });
  }

  saveDestinations = () => {
    console.log('Saving destinations', this.state.destinations)
    localStorage.setItem("destinations", JSON.stringify(this.state.destinations));
  }

  loadDestinations = () => {
    return JSON.parse(localStorage.getItem("destinations"));
  }

  addCommute = (address) => {
    var destination = {
      address: address
    }
    this.setState({ destinations: [...this.state.destinations, destination] });
  }

  removeCommute = (index) => {
    this.state.destinations.splice(index, 1);
    this.setState({ destinations: this.state.destinations.slice() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.destinations !== prevState.destinations) {
      this.saveDestinations();
    }
  }

  render() {
    var destinationAddresses = this.state.destinations.map(d => d.address);
    return (
      <div className="App">
        <div className="Origin">
          <h1>Origin</h1>
          <PlacesAutocomplete onSelect={this.updateOrigin} />
          <Map destinations={this.state.destinations} />
        </div>
        <div className="Commutes">
          <h1>Commutes</h1>
          <Commutes origin={this.state.origin} destinations={destinationAddresses} onRemoveCommute={this.removeCommute} />
          <AddCommuteButton onAddCommute={this.addCommute} />
        </div>
      </div>
    );
  }
}

export default App;
