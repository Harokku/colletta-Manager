import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'

import CollectGraph from './CollectGraph'
import VehicleLoadGraph from './VehicleLoadGraph'


export default class GraphsList extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <Grid columns={3}>
        <Grid.Column>
          <CollectGraph/>
        </Grid.Column>
        <Grid.Column>
          <VehicleLoadGraph/>
        </Grid.Column>
      </Grid>
    )
  }
}