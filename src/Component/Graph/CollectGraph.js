import React, {Component} from 'react';
import {graphql, gql} from 'react-apollo'
import {Dimmer, Loader, Segment, Header, Icon} from 'semantic-ui-react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

class CollectGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
  }

  subscribeToNewCollect = () => {
    this.props.data.subscribeToMore({
      document: gql`
        subscription {
            Collect(filter: {
                mutation_in: [CREATED]
            }) {
                node {
                    id
                    supermarket {
                        id
                    }
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
        console.log(result);
        return result
      }
    })
  };

  // TODO: Fix method fired before subscription update
  aggregateWithReduce = (data, markets) => {
    console.log(data)
    try {
      return data
        .reduce((accumulator, currValue) => {
          // Check if current value have a Supermarket associated
          if (currValue.supermarket) {
            // If TRUE add actual loaded quantity to accumulator (initialize it at 0 if needed)
            if (!accumulator.some(el => el.id === currValue.supermarket.id)) {
              let newItem = {};
              let marketIndex = markets.findIndex(index => index.id === currValue.supermarket.id)
              newItem['id'] = currValue.supermarket.id;
              newItem['markets'] = markets[marketIndex].city + ' - ' + markets[marketIndex].name
              newItem['Kg'] = 0;
              accumulator.push(newItem)
            }
            accumulator[accumulator.findIndex(index => index.id === currValue.supermarket.id)].Kg += currValue.loadedQty;
          } else {
            // If FALSE add actual loaded quantity to accumulator with default index = 000 (initialize it at 0 if needed)
            if (!accumulator.some(el => el.id === '000')) {
              let newItem = {};
              //let marketIndex = markets.findIndex(index => index.id === currValue.supermarket.id)
              newItem['id'] = '000';
              newItem['markets'] = 'Missing Market Data'
              newItem['Kg'] = 0;
              accumulator.push(newItem)
            }
            accumulator[accumulator.findIndex(index => index.id === '000')].Kg += currValue.loadedQty;
          }
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
    } catch (err){
      console.log(err)
      return '';
    }
  };

  componentWillReceiveProps(nextProp) {
    if(nextProp.data && this.props.data.loading){
      console.log('Calculating graph data')
      const graphData = this.aggregateWithReduce(nextProp.data.allCollects,nextProp.data.allSupermarkets)
      this.setState({graphData})
    }
    try {
      if (nextProp.data.allCollects.length > this.props.data.allCollects.length) {
        console.log('Updating graph data')
        const graphData = this.aggregateWithReduce(nextProp.data.allCollects, nextProp.data.allSupermarkets)
        this.setState({graphData})
      }
    } catch(err) {
      console.log('Still waiting for data...')
    }
  }

  componentDidMount() {
    this.subscribeToNewCollect();
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
    //const collectsData = this.props.data.allCollects;
    //const marketsIdList = this.props.data.allSupermarkets;

    //const graphData = this.aggregateWithReduce(collectsData, marketsIdList)
    const graphData = this.state.graphData;

    return (
      <div>
        <Header size='tiny' attached={'top'} as='h3' icon textAlign='center'>
          <Icon size={'mini'} name='shop'/>
          Ritiri dai SuperMarket
        </Header>
        <Segment attached color="green">
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={graphData}
                      margin={{top: 5, right: 30, left: 20, bottom: 100}}>
              <XAxis dataKey='markets' angle={-45} textAnchor='end' interval={0}/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey="Kg" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </Segment>
      </div>
    );
  }
}

const ALL_COLLECT_QUERY = gql`
    query data {
        allCollects {
            id
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