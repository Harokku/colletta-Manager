import React, {Component} from 'react'
import {Segment, Dimmer, Loader} from 'semantic-ui-react'
import {graphql, gql} from 'react-apollo'

class ShiftOutline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShiftCompleted: false,
    }
  }

  // Check if there are 2 Shifts for each Vehicle
  checkShiftCompleteness = (vehicles) => {
    // destructedResponse will be an object containing vehicles count and crews count
    const destructedResponse = vehicles
      .map((vehicle) => {
        return {
          vehicleId: vehicle.id,
          crewCount: vehicle._crewsMeta.count,
        }
      })
      .reduce((acc, curr) => {
        acc.vehicleId = curr.vehicleId ? acc.vehicleId += 1 : acc.vehicleId;
        acc.crewCount = acc.crewCount + curr.crewCount;
        return acc
      }, {vehicleId: 0, crewCount: 0})
    console.log(destructedResponse)

    // Return true if everything ok, else false
    return destructedResponse.vehicleId * 2 === destructedResponse.crewCount;
  };
// TODO: Implement fix mutation

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data.loading) {
      (this.checkShiftCompleteness(nextProps.data.allVehicles))
    }
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

    return (
      <div>

      </div>
    )
  }
}

// TODO: Implement query
const GET_VEHICLES_AND_SHIFT = gql`
    query getVehiclesForShifts {
        allVehicles {
            id
            radioCode
            model
            manufacturer
            _crewsMeta {
                count
            }
            crews {
                id
                shift
                _personnelsMeta{
                    count
                }
                personnels {
                    id
                    surname
                    name
                    role
                    phone
                    isDriver
                }
            }
        }
    }
`

export default graphql(GET_VEHICLES_AND_SHIFT)(ShiftOutline)
