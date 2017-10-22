import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './MarketsMap.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet/dist/leaflet'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min'

export default class MarketsMap extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
    this.state = {

    }
  }

  componentDidMount () {
    this.el = L.map('marketsMap').setView(this.props.marketCoords, 8);
    this.initializeMap();
  }

  initializeMap = () => {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.el);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.marketCoords !== this.props.marketCoords) {
      if (this.marker !== null) {
        this.marker.remove(this.el)
      }
      this.el.flyTo(this.props.marketCoords, 15)
      const markMarker = L.ExtraMarkers.icon({
        icon: 'fa-shopping-cart',
        markerColor: this.props.isClosed ? 'red' : 'green',
        iconColor: 'blue',
        shape: 'square',
        prefix: 'fa'
      })
      this.marker = L.marker(this.props.marketCoords, {icon: markMarker}).addTo(this.el)
      this.marker.bindPopup(this.props.marketName)
      //this.props.marketName !== '' ? this.marker.bindPopup(this.props.marketName) : null
    }
  }

  render() {
    return (
      <div id='marketsMap'>
      </div>
    )
  }
}

MarketsMap.propTypes = {
  marketCoords: PropTypes.array.isRequired,
  marketName: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
};