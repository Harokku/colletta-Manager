import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './MarketsMap.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet/dist/leaflet'

export default class MarketsMap extends Component {
  constructor(props) {
    super(props);
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
      this.el.flyTo(this.props.marketCoords, 15)
      this.marker = L.marker(this.props.marketCoords).addTo(this.el)
      this.props.marketName !== '' ? this.marker.bindPopup(this.props.marketName) : null
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
};