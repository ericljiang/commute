import React, { Component } from 'react';
import CommuteInfo from './CommuteInfo.js';
import AddCommuteButton from './AddCommuteButton.js';

export default class Commutes extends Component {
  constructor(props) {
    super(props);
    var destinations = this.loadDestinations();
    this.state = {
      destinations: destinations ? destinations : [],
      times: []
    };
  }

  componentDidMount() {
    if (this.props.origin && this.state.destinations.length > 0) {
      this.fetchTimes();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.origin && this.state.destinations.length > 0 &&
      (this.props.origin !== prevProps.origin || this.state.destinations !== prevState.destinations)) {
      this.fetchTimes();
    }
    if (this.state.destinations !== prevState.destinations) {
      this.saveDestinations();
    }
  }

  fetchTimes = () => {
    // fetch time from google
    console.log("fetching")
    var service = new window.google.maps.DistanceMatrixService();
    var request = {
      origins: [this.props.origin],
      destinations: this.state.destinations,
      travelMode: 'DRIVING'
    }
    service.getDistanceMatrix(request, (response) => {
      const times = response.rows[0].elements.map(element => element.duration.text);
      console.log(times);
      this.setState({ times: times });
    });
  }

  saveDestinations = () => {
    localStorage.setItem("destinations", JSON.stringify(this.state.destinations));
  }

  loadDestinations = () => {
    return JSON.parse(localStorage.getItem("destinations"));
  }

  addCommute = (address) => {
    this.setState({ destinations: [...this.state.destinations, address] });
  }

  removeCommute = (index) => {
    this.state.destinations.splice(index, 1);
    this.setState({ destinations: this.state.destinations.slice() });
  }

  render() {
    return (
      <div>
        {this.state.destinations.map((destination, key) =>
          <CommuteInfo
            key={key}
            destination={destination}
            time={this.state.times[key]}
            onDelete={this.removeCommute} />
        )}
        <AddCommuteButton onAddCommute={this.addCommute} />
      </div>
    );
  }
}
