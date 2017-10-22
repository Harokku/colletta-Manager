import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Label} from 'semantic-ui-react'

import ribbonColor from '../Functions/RibbonColor'


export default class CrewCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const personnel = this.props.personnels.map(personnel => {
      return (
      <Card.Content key={personnel.id}>
        <Label color={ribbonColor(personnel.role)} ribbon>{personnel.role}</Label>
        <br/>
        <Label color='brown'>
          Nome:<Label.Detail>{personnel.surname} {personnel.name}</Label.Detail>
        </Label>
        <br/>
        <Label color='teal'>
          Tel:<Label.Detail>{personnel.phone}</Label.Detail>
        </Label>
        <br/>
        {personnel.isDriver
          ? <Label color='olive'>Puo guidare</Label>
          : <Label color='grey'>Non Puo guidare</Label>}
      </Card.Content>
      )
    })

    return (
      <Card raised>
        <Card.Content>
          <Card.Header>
            Turno: {this.props.shift}
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
}