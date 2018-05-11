import React, { Component } from 'react';

class Map extends Component {
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementsByClassName('map')[0], {
      zoom: 10,
      center: { lat: 33.550, lng: -111.900 }
    });
    this.map = map;
  }

  renderMarkers = () => {
    this.props.destinations.forEach(destination => {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: destination.address }, (results, status) => {
        if (status === 'OK') {
          var marker = new window.google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
          });
          this.markers = [...this.markers, marker];
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  clearMarkers = () => {
    if (this.markers) {
      this.markers.forEach(marker => marker.setMap(null));
    }
    this.markers = [];
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    this.clearMarkers();
    this.renderMarkers();
    return <div className="map"></div>;
  }
}

export default Map;
