import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Sidebar, Segment, Dimmer, Loader, Table} from 'semantic-ui-react'

import VehicleCrew from './VehicleCrew'


class VehicleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCrew: null,
      sideBarVisible: false,
    }
  }

  showSidebarCrew = (crew, e) => {
    e.preventDefault();
    this.setState({
      selectedCrew: crew ? crew.personnels : null,
      sideBarVisible: true
    })
  }

  handleSidebarClose = () => {
    this.setState({
      sideBarVisible: false,
    })
  }

  tableBuilder = (data) => {
    return data.map((item) => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell selectable><a onClick={(e) => this.showSidebarCrew(item.crew, e)}>{item.radioCode}</a></Table.Cell>
          <Table.Cell>{Math.round((item.actualLoad + item.tare) / item.tmfl * 100)}</Table.Cell>
          <Table.Cell>{item.speed}</Table.Cell>
          <Table.Cell>{item.crew ? item.crew.shift : 'Nessun equipaggio'}</Table.Cell>
        </Table.Row>
      );
    })
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

    const vehiclesData = this.props.data.allVehicles;

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Segment}
          animation='overlay'
          direction='right'
          visible={this.state.sideBarVisible}
          width='very wide'
        >
          <VehicleCrew
            crew={this.state.selectedCrew ? this.state.selectedCrew : ''}
            onCloseClicked={this.handleSidebarClose}
          />
        </Sidebar>

        <Sidebar.Pusher>
          <Table celled striped attached='top'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Codice Radio</Table.HeaderCell>
                <Table.HeaderCell>% di carico</Table.HeaderCell>
                <Table.HeaderCell>Velocita'</Table.HeaderCell>
                <Table.HeaderCell>Turno</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.tableBuilder(vehiclesData)}
            </Table.Body>
          </Table>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const ALL_VEHICLES_QUERY = gql`
  query getAllVehicles {
    allVehicles {
      id
      radioCode
      actualLoad
      tare
      tmfl
      speed
      crew {
        shift
        personnels {
          surname
          name
          phone
        }
      }
    }
  }
`

export default graphql(ALL_VEHICLES_QUERY)(VehicleTable)