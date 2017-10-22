import React, {Component} from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet/dist/leaflet'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min'

export default class VehicleMarker extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  plotVehicle = () => {
    const markerIcon = L.ExtraMarkers.icon({
      extraClasses: 'fa-3x',
      icon: 'fa-' + this.props.vehicle.icon.toLowerCase(),
      markerColor: this.colorOnPercent(),
      iconColor: 'white',
      shape: 'circle',
      prefix: 'fa',
    });
    this.marker = L.marker([this.props.vehicle.latitude, this.props.vehicle.longitude],
      {icon: markerIcon}).addTo(this.props.mapElement)
    this.marker.bindPopup(this.props.vehicle.radioCode)
  };

  colorOnPercent = () => {
    const {actualLoad, tmfl, tare} = this.props.vehicle;
    const loadPerCent = actualLoad / (tmfl - tare) * 100;
    if (loadPerCent <= 85) {
      return 'green'
    } else if (loadPerCent <= 100) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapElement !== this.props.mapElement && this.props.mapElement !== null) {
      this.plotVehicle()
    }
    if (prevProps.vehicle !== this.props.vehicle && this.props.mapElement !== null) {
      if (this.marker !== null) {
        this.marker.remove(this.props.mapElement)
      }
      this.plotVehicle();
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

VehicleMarker.propTypes = {
  vehicle: PropTypes.object.isRequired,
  mapElement: PropTypes.object,
}