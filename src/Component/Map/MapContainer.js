import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Segment, Dimmer, Loader} from 'semantic-ui-react'
import {Map, TileLayer, Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet'
import './MapContainer.css'
import {MarketMarkerBuilder, VehicleMarkerBuilder} from './MarkerBuilder'

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 45.8518,
      lon: 8.7561,
      zoom: 11,
    }
  }

  subscribeToNewMarketsAndVehicles = () => {
    this.props.data.subscribeToMore({
      document: gql`
          subscription {
              Supermarket(filter: {
                  mutation_in: [CREATED]
              }) {
                  node {
                      id
                      city
                      name
                      latitude
                      longitude
                      isClosed
                      icon
                  }
              }
          }
      `,
      updateQuery: (previous, {subscriptionData}) => {
        const newAllMarkets = [
          subscriptionData.data.Supermarket.node,
          ...previous.allSupermarkets
        ]
        const result = {
          ...previous,
          allSupermarkets: newAllMarkets
        }
        return result
      }
    })
  };

  componentDidMount() {
    this.subscribeToNewMarketsAndVehicles()
  }

  render() {

    if (this.props.data && this.props.data.loading) {
      return (
        <Segment color="red">
          <Dimmer active>
            <Loader
              indeterminate={true}
            >
              Waiting for your data to arrive
            </Loader>
          </Dimmer>
        </Segment>
      )
    }

    // 2
    if (this.props.data && this.props.data.error) {
      return (
        <div>
          <Segment color="red">Error retrieving data</Segment>
        </div>
      )
    }

    const marketsData = this.props.data.allSupermarkets;
    const vehiclesData = this.props.data.allVehicles;

    const mapMarketMarkers = marketsData.map(market => {
      return <Marker key={market.id} position={[market.latitude, market.longitude]} icon={MarketMarkerBuilder(market)}/>
    });

    const mapVehicleMarkers = vehiclesData.map(vehicle => {
      return <Marker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={VehicleMarkerBuilder(vehicle)}/>
    });

    const position =  [this.state.lat, this.state.lon]
    return (
      <div>
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                   attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {mapMarketMarkers}
        {mapVehicleMarkers}
      </Map>
      </div>
    )
  }
}

const ALL_MAP_DATA = gql`
    query allMarketData {
        allSupermarkets {
            id
            city
            name
            latitude
            longitude
            isClosed
            icon
        }
        allVehicles {
            id
            radioCode
            latitude
            longitude
            icon
            actualLoad
            tare
            tmfl
        }
    }
`

export default graphql(ALL_MAP_DATA)(MapContainer)