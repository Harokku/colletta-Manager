import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Grid, List, Segment, Dimmer, Loader, Card} from 'semantic-ui-react'

import CrewListItem from './CrewListItem'
import CrewCard from './CrewCard'

class CrewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: ''
    }
  }

  handleListClick = (id) => {
    this.setState({
      selectedVehicle: id,
    })
  };

  // TODO: Try to refactor in pure functional way
  extractPersonnelsPerShift = (data) => {
    const filteredVehicle = data.filter(el => {
      return el.id === this.state.selectedVehicle
    });
    console.log(filteredVehicle);
    return filteredVehicle[0] ? filteredVehicle[0].crews.map(crew => {
      return <CrewCard key={crew.id} shift={crew.shift} crewID={crew.id} personnels={crew.personnels}/>
    }) : ''
  };

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
                personnels{
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