import React, {Component} from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet/dist/leaflet'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min'

export default class MarketMarker extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  plotMarket = () => {
    const markerIcon = L.ExtraMarkers.icon({
      extraClasses: 'fa-3x',
      icon: this.props.market.icon === 'SHOP' ? 'fa-' + this.props.market.icon.toLowerCase() + 'ping-cart' : 'fa-home',
      markerColor: this.props.market.isClosed ? 'orange-dark' : 'blue-dark',
      iconColor: 'white',
      shape: 'square',
      prefix: 'fa',
    });
    this.marker = L.marker([this.props.market.latitude, this.props.market.longitude],
      {icon: markerIcon}).addTo(this.props.mapElement)
    this.marker.bindPopup(this.props.market.city + ' - ' + this.props.market.name)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.mapElement !== this.props.mapElement && this.props.mapElement !== null) {
      this.plotMarket()
    }
    if (prevProps.market !== this.props.market && this.props.mapElement !== null) {
      if (this.marker !== null) {
        this.marker.remove(this.props.mapElement)
      }
      this.plotMarket();
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

MarketMarker.propTypes = {
  market: PropTypes.object.isRequired,
  mapElement: PropTypes.object,
}