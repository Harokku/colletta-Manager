import React, {Component} from 'react'
import {Card, List} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class MapPopupVehicle extends Component {
  constructor(props) {
    super(props);
  }

  timeBasedShiftSelector = () => {
    return moment().isBetween('07:00:00', '15:00:00', 'hour')
  }

  render() {

    const {data} = this.props;
    const loadPercent = Math.round((data.actualLoad / (data.tmfl - data.tare) * 100));

    return (
      <Card>
        <Card.Content>
          <Card.Header>{data.bancoCode}</Card.Header>
        </Card.Content>
        <Card.Content>
          <List>
            <List.Item icon='rocket' content={Math.round(data.speed) + ' Km/h'} />
            <List.Item icon='law' content={loadPercent + ' %'} />
            <List.Item icon='users' content={'Turno ' + this.timeBasedShiftSelector() ? 'mattina' : 'pomeriggio'} />
          </List>
        </Card.Content>
      </Card>
    )
  }
}


MapPopupVehicle.propTypes = {
  data: PropTypes.object.isRequired,
}