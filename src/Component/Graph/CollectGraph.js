import React, {Component} from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {graphql, gql} from 'react-apollo'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

class CollectGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
  }

  aggregateWithReduce = (data, markets) => {
    return data
      .reduce((accumulator, currValue) => {
        if (!accumulator.some(el => el.id === currValue.supermarket.id)) {
          let newItem = {};
          let marketIndex = markets.findIndex(index => index.id === currValue.supermarket.id)
          newItem['id'] = currValue.supermarket.id;
          newItem['markets'] =  markets[marketIndex].city + ' - ' + markets[marketIndex].name
          newItem['Kg'] = 0;
          accumulator.push(newItem)
        }
        accumulator[accumulator.findIndex(index => index.id === currValue.supermarket.id)].Kg += currValue.loadedQty;
        return accumulator
      }, [])
      .sort((a, b) => {
        let nameA = a.markets.toUpperCase(); // ignore upper and lowercase
        let nameB = b.markets.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

  };

  componentWillReceiveProps(nextProp) {
    if (this.props.data.loading && !nextProp.data.loading) {
      this.setState({graphData: this.aggregateWithReduce(nextProp.data.allCollects, nextProp.data.allSupermarkets)})
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

    // 3
    //const collectsData = this.props.data.allCollects
    //const marketsIdList = this.props.data.allSupermarkets

    return (
      <div>
        <Segment color="red">
          <BarChart width={600} height={400} data={this.state.graphData}
                    margin={{top: 5, right: 30, left: 20, bottom: 100}}>
            <XAxis dataKey='markets' angle={-45} textAnchor='end' interval={0}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Bar dataKey="Kg" fill="#8884d8"/>
          </BarChart>
        </Segment>
      </div>
    );
  }
}

const ALL_COLLECT_QUERY = gql`
  query data {
    allCollects {
      supermarket {
        id
      }
      loadedQty
    }
    allSupermarkets{
      id
      city
      name
    }
  }
`

export default graphql(ALL_COLLECT_QUERY)(CollectGraph)