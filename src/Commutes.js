import React, { Component } from 'react';
import CommuteInfo from './CommuteInfo.js';

export default class Commutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    };
  }

  componentDidMount() {
    if (this.props.origin && this.props.destinations.length > 0) {
      this.fetchTimes();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.origin && this.props.destinations.length > 0 &&
      (this.props.origin !== prevProps.origin || this.props.destinations !== prevProps.destinations)) {
      this.fetchTimes();
    }
  }

  fetchTimes = () => {
    // fetch time from google
    console.log("fetching")
    var service = new window.google.maps.DistanceMatrixService();
    var request = {
      origins: [this.props.origin],
      destinations: this.props.destinations,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: 'bestguess'
      }
    }
    service.getDistanceMatrix(request, (response) => {
      const times = response.rows[0].elements.map(element => element.duration_in_traffic.text);
      this.setState({ times: times });
    });
  }

  render() {
    return (
      <div>
        {this.props.destinations.map((destination, key) =>
          <CommuteInfo
            key={key}
            index={key}
            origin={this.props.origin}
            destination={destination}
            time={this.state.times[key]}
            onDelete={this.props.onRemoveCommute} />
        )}
      </div>
    );
  }
}
