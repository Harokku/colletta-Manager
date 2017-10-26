import React, {Component} from 'react'
import {Icon, Statistic, Divider, Segment, Dimmer, Loader} from 'semantic-ui-react'
import {graphql, gql} from 'react-apollo'


class Counters extends Component {

  subscribeToUpdatedCollect = () => {
    this.props.data.subscribeToMore({
      document: gql`
        subscription {
            Collect(filter: {
                mutation_in: [CREATED]
            }) {
                node {
                    loadedQty
                }
            }
        }
      `,
      updateQuery: (previous, {subscriptionData}) => {
        const newAllCollects = [
          subscriptionData.data.Collect.node,
          ...previous.allCollects
        ];
        const result = {
          ...previous,
          allCollects: newAllCollects
        };
        return result
      }
    })
  };


  componentWillReceiveProps(nextProp) {

  }

  componentDidMount() {
    this.subscribeToUpdatedCollect();
  }

  render() {

    if (this.props.data && this.props.data.loading) {

      return (
          <Segment color="red">
            <Dimmer active>
              <Loader indeterminate={true}>
                Waiting for your data to arrive
              </Loader>
            </Dimmer>
            <Divider/>
            <Statistic.Group widths='one'>
              <Statistic size='huge' label='Kg Raccolti' value='...'/>
            </Statistic.Group>
            <Statistic.Group widths='three'>
              <Statistic>
                <Statistic.Value><Icon name='users'/>...</Statistic.Value>
                <Statistic.Label>Volontari</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value><Icon name='truck'/>...</Statistic.Value>
                <Statistic.Label>Mezzi</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value><Icon name='shop'/>...</Statistic.Value>
                <Statistic.Label>SuperMarket</Statistic.Label>
              </Statistic>
            </Statistic.Group>
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

    const collectedQuantity = this.props.data.allCollects;
    const aggregatedLoadedQuantity = collectedQuantity.reduce((accumulator, currValue) => {
      return accumulator += currValue.loadedQty
    },0);

    return (
      <div>
        <Statistic.Group widths='one'>
          <Statistic size='huge' label='Kg Raccolti' value={aggregatedLoadedQuantity}/>
        </Statistic.Group>
        <Divider/>
        <Statistic.Group widths='three'>
          <Statistic>
            <Statistic.Value><Icon name='users'/>{this.props.data._allPersonnelsMeta.count.toString()}</Statistic.Value>
            <Statistic.Label>Volontari</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value><Icon name='truck'/>{this.props.data._allVehiclesMeta.count.toString()}</Statistic.Value>
            <Statistic.Label>Mezzi</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value><Icon name='shop'/>{this.props.data._allSupermarketsMeta.count.toString()}</Statistic.Value>
            <Statistic.Label>SuperMarket</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    )
  }
}

const STATS_QUERY = gql`
  query statsData {
    _allVehiclesMeta {
      count
    }
    _allPersonnelsMeta {
      count
    }
    _allSupermarketsMeta {
      count
    }
    allCollects {
        loadedQty
    }
  }
`

export default graphql(STATS_QUERY)(Counters)