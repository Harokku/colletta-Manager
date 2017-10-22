import React, {Component} from 'react'
import PropTypes from 'prop-types'
import VehicleMarker from './VehicleMarker'
import MarketMarker from './MarketMarker'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet/dist/leaflet'

import './MapOverview.css'


export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.el = null;
    this.state = {
      el: null,
    }
  }

  initializeMap = () => {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.el);
    this.setState({
      el: this.el,
    })
  };

  plotVehicles = () => {
    if (this.props.vehicles) {
      return this.props.vehicles.map(vehicle => {
        return (
          <VehicleMarker key={vehicle.id} vehicle={vehicle} mapElement={this.el}/>
        )
      })
    }
  };

  plotMarkets = () => {
    if (this.props.markets) {
      return this.props.markets.map(market => {
        return (
          <MarketMarker key={market.id} market={market} mapElement={this.el}/>
        )
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps !== this.props.vehicles){
      this.plotVehicles();
    }
  }

  componentDidMount () {
    this.el = L.map('overviewMap').setView([45.8518, 8.7561], 11)
    this.initializeMap()
  }

  // TODO: Implement markets plot function
  render() {
    return (
      <div>
        <div id='overviewMap'>

        </div>
        {this.plotVehicles()}
        {this.plotMarkets()}
      </div>
    )
  }
}

MapContainer.propTypes = {
  markets: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
};