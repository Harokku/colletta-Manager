import React, {Component} from 'react'
import {Segment, Loader, Dimmer} from 'semantic-ui-react'
import {graphql, gql} from 'react-apollo'
import MapContainer from './MapContainer'

class MapOverview extends Component {

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

    return (
      <div>
        <MapContainer markets={marketsData} vehicles={vehiclesData}/>
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

export default graphql(ALL_MAP_DATA)(MapOverview)