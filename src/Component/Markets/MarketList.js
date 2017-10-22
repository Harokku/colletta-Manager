import React, {Component} from 'react'
import {Table, Divider} from 'semantic-ui-react'
import MarketsMap from './MarketsMap'
import {Segment, Loader, Dimmer} from 'semantic-ui-react'
import {graphql, gql} from 'react-apollo'

class MarketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarketCoords: [45.796889, 8.846316],
      selectedMarketName: '',
      selectedMarketStatus: false,
    }
  }

  flyToMarket = (coords, name, status, e) => {
    e.preventDefault();

    this.setState({
      selectedMarketCoords: coords,
      selectedMarketName: name,
      selectedMarketStatus: status,
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

    const marketsData = this.props.data.allSupermarkets;

    // TODO: Implement GeoCoding for address translation
    const marketsList = marketsData.map(market => {
      return (
        <Table.Row key={market.id}>
          <Table.Cell>{market.city}</Table.Cell>
          <Table.Cell><a href=''
                         onClick={(e) => this.flyToMarket([market.latitude, market.longitude],
                           market.city + ' - ' + market.name,
                           market.isClosed,
                           e)}>{market.name}</a>
          </Table.Cell>
          <Table.Cell><a href=''
                         onClick={(e) => this.flyToMarket([market.latitude, market.longitude],
                           market.city + ' - ' + market.name,
                           market.isClosed,
                           e)}>{market.address}</a>
          </Table.Cell>
          <Table.Cell>{market.managerPhone}</Table.Cell>
          <Table.Cell>{market.isClosed ? 'Gia chiuso' : 'Ancora aperto'}</Table.Cell>
        </Table.Row>
      )
    });

    return (
      <div>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Citta'</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Indirizzo</Table.HeaderCell>
              <Table.HeaderCell>Tel. Responsabile</Table.HeaderCell>
              <Table.HeaderCell>Stato Apertura</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {marketsList}
          </Table.Body>
        </Table>

        <Divider/>

        <MarketsMap marketCoords={this.state.selectedMarketCoords} marketName={this.state.selectedMarketName}
                    isClosed={this.state.selectedMarketStatus}/>
      </div>
    )
  }
}

const GET_ALL_MARKETS = gql`
    query allMarkets {
        allSupermarkets (orderBy: city_ASC) {
            id
            city
            name
            address
            isClosed
            managerPhone
            latitude
            longitude
        }
    }
`

export default graphql(GET_ALL_MARKETS)(MarketList)