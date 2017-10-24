import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Label, Button} from 'semantic-ui-react'

import {ribbonColor, shiftColor} from '../Functions/RibbonColor'


export default class CrewCard extends Component {

  render() {

    const personnel = this.props.personnels.map(personnel => {
      return (
      <Card.Content key={personnel.id}>
        <Label color={ribbonColor(personnel.role)} ribbon>{personnel.role}</Label>
        <br/>
        <Label color='blue' image basic>
          Nome:<Label.Detail>{personnel.surname} {personnel.name}</Label.Detail>
        </Label>
        <br/>
        <Label color='teal' image basic>
          Tel:<Label.Detail><a href={'tel:'+personnel.phone}>{personnel.phone}</a></Label.Detail>
        </Label>
        <br/>
        {personnel.isDriver
          ? <Label color='green' image>Puo guidare</Label>
          : <Label color='red' image>Non Puo guidare</Label>}
      </Card.Content>
      )
    })

    return (
      <Card raised>
        <Card.Content>
          <Card.Header>
            Turno: <Label tag color={shiftColor(this.props.shift)}>{this.props.shift}</Label>
            <Button floated='right' icon='close' onClick={this.props.cardCloseFunc}/>
          </Card.Header>
        </Card.Content>
        {personnel}
      </Card>
    )
  }
}

CrewCard.propTypes = {
  crewID: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  personnels: PropTypes.array.isRequired,
  cardCloseFunc: PropTypes.func,
}