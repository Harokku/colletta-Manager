import React, {Component} from 'react'
import CollectGraph from './CollectGraph'
import VehicleLoadGraph from './VehicleLoadGraph'


export default class GraphsList extends Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div>
        <CollectGraph/>
        <VehicleLoadGraph/>
      </div>
    )
  }
}