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
      <Grid>
        <Grid.Column mobile={16} computer={5}>
          <CollectGraph/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5}>
          <VehicleLoadGraph/>
        </Grid.Column>
      </Grid>
    )
  }
}