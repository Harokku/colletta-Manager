import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Grid, List, Segment, Dimmer, Loader, Card} from 'semantic-ui-react'

import CrewListItem from './CrewListItem'
import CrewCard from './CrewCard'

class CrewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: null,
    }
  }

  handleListClick = (id) => {
    this.setState({
      selectedVehicle: id,
    })
  };

  handleCardClose = () => {
    this.setState({
      selectedVehicle: null,
    })
  }

  extractPersonnelsPerShift = (data) => {
    if (this.state.selectedVehicle) {
      return data
        .filter(vehicle => vehicle.id === this.state.selectedVehicle)
        .reduce((acc, curr) => {
          return curr.crews
        }, [])
        .map(crew => {
          return <CrewCard cardCloseFunc={this.handleCardClose} key={crew.id} shift={crew.shift} crewID={crew.id} personnels={crew.personnels}/>
        })
    } else {
      return null
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

    const crewData = this.props.data.allVehicles;
    // TODO: Implement crew completness validator
    const listItems = crewData.map(vehicle =>
      <CrewListItem onItemClick={this.handleListClick} key={vehicle.id} id={vehicle.id}
                    selectedId={this.state.selectedVehicle} icon={vehicle.icon.toLowerCase()}
                    radioCode={vehicle.radioCode}/>
    );

    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column width={3}>
            <List size='large' divided animated selection verticalAlign='middle'>
              {listItems}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Card.Group>
              {this.extractPersonnelsPerShift(crewData)}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const GET_ALL_CREW = gql`
    query getAllCrewAndPersonnel {
        allVehicles{
            id
            icon
            radioCode
            crews{
                id
                shift
                personnels (orderBy: role_ASC) {
                    id
                    surname
                    name
                    phone
                    isDriver
                    role
                }
            }
        }
    }
`

export default graphql(GET_ALL_CREW)(CrewList)