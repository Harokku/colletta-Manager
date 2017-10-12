import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Segment, Dimmer, Loader, Table} from 'semantic-ui-react'

class VehicleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: ''
    }
  }

  // TODO: Refactor this to show attached table only if row is clicked
  tableBuilder = (data) => {
    return data.map((item) => {
      return (
        <Table.Body>
        <Table.Row key={item.id}>
          <Table.Cell>{item.radioCode}</Table.Cell>
          <Table.Cell>{item.actualLoad}</Table.Cell>
          <Table.Cell>{item.speed}</Table.Cell>
          <Table.Cell>{item.crew ? item.crew.shift : 'Nessun equipaggio'}</Table.Cell>
        </Table.Row>

        </Table.Body>
      );
    })
  };

  tableCrewBuilder = () => {
    return (
      <Table attached='bottom'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cognome</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Ruolo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Crenna</Table.Cell>
            <Table.Cell>Simone</Table.Cell>
            <Table.Cell>3214</Table.Cell>
            <Table.Cell>Autista</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Speroni</Table.Cell>
            <Table.Cell>Dugongo</Table.Cell>
            <Table.Cell>3214</Table.Cell>
            <Table.Cell>NAvigatore</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
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
      <Table selectable striped attached='top'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Codice Radio</Table.HeaderCell>
            <Table.HeaderCell>% di carico</Table.HeaderCell>
            <Table.HeaderCell>Velocita'</Table.HeaderCell>
            <Table.HeaderCell>Turno</Table.HeaderCell>
          </Table.Row>
        </Table.Header>


          {this.tableBuilder(vehiclesData)}
        {this.tableCrewBuilder()}



        {/*<Table.Body>
         <Table.Row>
           <Table.Cell>1011</Table.Cell>
           <Table.Cell>85</Table.Cell>
           <Table.Cell>55</Table.Cell>
           <Table.Cell>Mattina</Table.Cell>
         </Table.Row>

         <Table attached='bottom'>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Cognome</Table.HeaderCell>
               <Table.HeaderCell>Nome</Table.HeaderCell>
               <Table.HeaderCell>Telefono</Table.HeaderCell>
               <Table.HeaderCell>Ruolo</Table.HeaderCell>
             </Table.Row>
           </Table.Header>
           <Table.Row>
             <Table.Cell>Crenna</Table.Cell>
             <Table.Cell>Simone</Table.Cell>
             <Table.Cell>3214</Table.Cell>
             <Table.Cell>Autista</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Speroni</Table.Cell>
             <Table.Cell>Dugongo</Table.Cell>
             <Table.Cell>3214</Table.Cell>
             <Table.Cell>NAvigatore</Table.Cell>
           </Table.Row>
         </Table>

         <Table.Row>
           <Table.Cell>1011</Table.Cell>
           <Table.Cell>85</Table.Cell>
           <Table.Cell>55</Table.Cell>
           <Table.Cell>Mattina</Table.Cell>
         </Table.Row>
         <Table.Row>
           <Table.Cell>1011</Table.Cell>
           <Table.Cell>85</Table.Cell>
           <Table.Cell>55</Table.Cell>
           <Table.Cell>Mattina</Table.Cell>
         </Table.Row>
       </Table.Body>*/}

      </Table>
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