import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import VehicleLoadGraph from '../Graph/VehicleLoadGraph'
import CollectGraph from '../Graph/CollectGraph'
import Counters from './Counters';


export default function Dashboard(props) {
  return (
    <div>
      <Segment>
        <Counters/>
      </Segment>
      <Grid>
        <Grid.Column mobile={16} computer={8}>
          <VehicleLoadGraph/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <CollectGraph/>
        </Grid.Column>
      </Grid>
    </div>
  )
}