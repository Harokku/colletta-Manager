import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import VehicleLoadGraph from '../Graph/VehicleLoadGraph'
import Counters from './Counters';


export default function Dashboard(props) {
  return (
    <div>
      <Segment>
        <Counters/>
      </Segment>
      <Grid columns={2}>
        <Grid.Column>
          <VehicleLoadGraph/>
        </Grid.Column>
      </Grid>
    </div>
  )
}