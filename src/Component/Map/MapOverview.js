import React, {Component} from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import './MapOverview.css'

const DEFAULT_VIEWPORT = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
}

export default class MapOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      lat: 45.83279,
      lng: 8.80027,
      zoom: 16,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>Centrale di Coordinamento Ritiro Pacchi. <br/> Yo da Fuck!</span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}