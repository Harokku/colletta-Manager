import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'

import CollectGraph from './CollectGraph'
import VehicleLoadGraph from './VehicleLoadGraph'
import TimeLoadGraph from './TimeLoadGraph'


export default class GraphsList extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <Grid>
       <Grid.Row>
         <Grid.Column mobile={16} computer={8}>
          <CollectGraph/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <VehicleLoadGraph/>
        </Grid.Column>
       </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TimeLoadGraph/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}