import React, {Component} from 'react';
import {graphql, gql} from 'react-apollo'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine} from 'recharts'

class VehicleLoadGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
  }

  aggregateWithReduce = (data) => {
    return data
      .reduce((accumulator, currValue) => {
        let newItem = {};
        newItem['id'] = currValue.id;
        newItem['vehicles'] = currValue.radioCode;
        newItem['load'] = (currValue.actualLoad + currValue.tare) / currValue.tmfl * 100
        accumulator.push(newItem)
        return accumulator
      }, [])
      .sort((a, b) => {
        let nameA = a.vehicles.toUpperCase(); // ignore upper and lowercase
        let nameB = b.vehicles.toUpperCase(); // ignore upper and lowercase
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
      this.setState({graphData: this.aggregateWithReduce(nextProp.data.allVehicles)})
    }
  }

  componentDidMount() {
    if (this.props.data.networkStatus === 7 && this.state.graphData.length === 0) {
      this.setState({graphData: this.aggregateWithReduce(this.props.data.allVehicles)})
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
    //const vehiclesData = this.props.data.vehiclesData


    return (
      <div>
        <Segment color="red">
          <BarChart width={600} height={400} data={this.state.graphData}
                    margin={{top: 5, right: 30, left: 20, bottom: 100}}>
            <XAxis dataKey='vehicles' angle={-45} textAnchor='end' interval={0}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Bar dataKey="load" fill="#8884d8"/>
            <ReferenceLine y={100} label={'Sovraccarico (100%)'} stroke='red' isFront={true} alwaysShow={true}/>
            <ReferenceLine y={85} label={'Soglia di allerta (85%)'} stroke='orange' isFront={true} alwaysShow={true}/>
          </BarChart>
        </Segment>
      </div>
    );
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
    }
  }
`

export default graphql(ALL_VEHICLES_QUERY)(VehicleLoadGraph)