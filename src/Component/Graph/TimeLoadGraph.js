import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Dimmer, Loader, Segment, Header, Icon} from 'semantic-ui-react'
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip} from 'recharts'
import moment from 'moment';
import * as d3 from 'd3'


class TimeLoadGraph extends Component {
  constructor(props) {
    super(props);
  }

  // TODO: Implement real time updates
  aggregateData = (data) => {
    const orderedClassedData = data
      .map(dataPoint => {
        return {
          time: moment(dataPoint.createdAt, moment.ISO_8601).format("ddd - HH"),
          value: dataPoint.loadedQty,
        }
      })
      .sort((a,b) => {
        let timeA = moment(a.time, "ddd - HH").unix()
        let timeB = moment(b.time, "ddd - HH").unix()

        if (timeA < timeB) {
          return -1;
        }
        if (timeA > timeB) {
          return 1;
        }

        // names must be equal
        return 0;

      })
    console.log(orderedClassedData)

    const graphData = d3.nest()
      .key(d => {return d.time})
      .rollup(v => {return d3.sum(v, d => { return d.value})})
      .entries(orderedClassedData)

    console.log(graphData)

    return graphData
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
    const timeSeriesData = this.props.data.allCollects
    this.aggregateData(timeSeriesData)

    return (
      <div>
        <Header size='tiny' attached={'top'} as='h3' icon textAlign='center'>
          <Icon size={'mini'} name='line chart'/>
          Carichi / Tempo
        </Header>
        <Segment attached color="red">
          <ResponsiveContainer width='100%' height={350}>
            <LineChart data={ this.aggregateData(timeSeriesData)}
                       margin={{top: 5, right: 30, left: 20, bottom: 100}}>
              <XAxis dataKey='key' angle={-45} textAnchor={'end'} interval={0}/>
              <YAxis label={{ value: 'Kg caricati', angle: -90, position: 'left' }}/>
              <CartesianGrid/>
              <Tooltip/>
              <Line type='natural' dataKey='value' stroke='#FF3F49' activeDot={{r: 8}} animationDuration='2500'/>
            </LineChart>
          </ResponsiveContainer>
        </Segment>
      </div>
    )
  }
}

const TIME_SERIES_QUERY = gql`
    query getTimeSeriesData {
        allCollects{
            id
            createdAt
            loadedQty
        }
    }
`

export default graphql(TIME_SERIES_QUERY)(TimeLoadGraph)