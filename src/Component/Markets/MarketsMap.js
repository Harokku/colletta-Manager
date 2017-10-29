import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Map, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet'
import './MarketsMap.css'
import {SimpleMarketMarkerBuilder} from '../Map/MarkerBuilder'

export default class MarketsMap extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
    this.state = {
      lat: 45.8518,
      lon: 8.7561,
      zoom: 18,
    }
  }

  render() {

    const position = [this.state.lat, this.state.lon]
    return (
      <div>
        <Map center={this.props.marketCoords ? this.props.marketCoords : position}
             zoom={this.state.zoom}
             useFlyTo
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                     attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={this.props.marketCoords} icon={SimpleMarketMarkerBuilder(this.props.isClosed)}>
            <Popup>
              <span>{this.props.marketName}</span>
            </Popup>
            <Tooltip>
              <span>{this.props.marketName}</span>
            </Tooltip>
          </Marker>
        </Map>
      </div>
    )
  }
}

MarketsMap.propTypes = {
  marketCoords: PropTypes.array.isRequired,
  marketName: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
};