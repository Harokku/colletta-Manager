import L from 'leaflet/dist/leaflet'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min'

export function MarketMarkerBuilder(markerData) {
  return L.ExtraMarkers.icon({
    extraClasses: 'fa-3x',
    icon: markerData.icon === 'SHOP' ? 'fa-' + markerData.icon.toLowerCase() + 'ping-cart' : 'fa-home',
    markerColor: markerData.isClosed ? 'orange-dark' : 'blue-dark',
    iconColor: 'white',
    shape: 'square',
    prefix: 'fa',
  })
}

export function SimpleMarketMarkerBuilder(isClosed) {
  return L.ExtraMarkers.icon({
    extraClasses: 'fa-3x',
    icon: 'fa-shopping-cart',
    markerColor: isClosed ? 'orange-dark' : 'blue-dark',
    iconColor: 'white',
    shape: 'square',
    prefix: 'fa',
  })
}

export function VehicleMarkerBuilder(markerData) {
  return L.ExtraMarkers.icon({
    extraClasses: 'fa-3x',
    icon: 'fa-' + markerData.icon.toLowerCase(),
    markerColor: colorOnPercent(markerData),
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  })
}

function colorOnPercent(data) {
  const {actualLoad, tmfl, tare} = data;
  const loadPerCent = actualLoad / (tmfl - tare) * 100;
  if (loadPerCent <= 85) {
    return 'green'
  } else if (loadPerCent <= 100) {
    return 'yellow'
  } else {
    return 'red'
  }
}