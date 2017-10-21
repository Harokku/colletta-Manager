import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Sidebar, Segment, Dimmer, Loader, Table, Label} from 'semantic-ui-react'

import VehicleCrew from './VehicleCrew'
import VehicleFormNew from './VehicleFormNew'


class VehicleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCrew: null,
      selectedRow: null,
      sideBarVisible: false,
      newVehicle: {
        radioCode: '',
        manufacturer: '',
        model: '',
        tmfl: '',
        tare: '',
      },
    }
  }

  showSidebarCrew = (crew, id, e) => {
    e.preventDefault();
    this.setState({
      selectedCrew: crew.length > 0 ? crew : null,
      selectedRow: id,
      sideBarVisible: true
    })
  }

  handleSidebarClose = () => {
    this.setState({
      selectedRow: null,
      sideBarVisible: false,
    })
  }

  tableBuilder = (data) => {
    return data.map((item) => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>
            {item.id === this.state.selectedRow
              ? <Label ribbon color='black'>{item.radioCode}</Label>
              : item.radioCode
            }
          </Table.Cell>
          <Table.Cell>{Math.round(item.actualLoad / (item.tmfl - item.tare) * 100)}</Table.Cell>
          <Table.Cell>{item.speed}</Table.Cell>
          <Table.Cell selectable>{item.crews.length > 0
            ? <a onClick={(e) => this.showSidebarCrew(item.crews, item.id, e)}>Mostra equipaggi</a>
            : <b>'Nessun equipaggio'</b>
          }
            </Table.Cell>
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
          width='wide'
        >
          <VehicleCrew
            crews={this.state.selectedCrew ? this.state.selectedCrew : []}
            onCloseClicked={this.handleSidebarClose}
          />
        </Sidebar>

        <Sidebar.Pusher>
          <Table celled striped>
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

          <VehicleFormNew/>

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
      crews {
        shift
        personnels {
          surname
          name
          phone
          role
        }
      }
    }
  }
`

export default graphql(ALL_VEHICLES_QUERY)(VehicleTable)