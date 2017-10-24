import React from 'react'
import PropTypes from 'prop-types'
import {Card, Icon, Button, Label} from 'semantic-ui-react'

import {ribbonColor, shiftColor} from '../Functions/RibbonColor'

function listCard(props) {
  return (
    <Card>
      <Card.Content>
        <Button floated='left' size='mini' icon onClick={(e) => props.onCloseClicked()}><Icon name='close'/></Button>
        <Card.Header>
          Equipaggio
        </Card.Header>
      </Card.Content>
        {props.crews.length > 0 ? listCrew(props.crews) : ''}
    </Card>
  )
}

function listCrew(crews) {
  return crews.map((item, index) => {
    return (
      <Card.Content key={index}>
        <Label pointing='below' color={shiftColor(item.shift)}>{item.shift}</Label>
        {item.personnels.map((personnel, index) => {
          return (
            <div key={index}>
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
            </div>
          )
        })}
      </Card.Content>
    )
  })
}

export default function VehicleCrew(props) {
  return (
    <Card.Group>
      {listCard(props)}
    </Card.Group>
  )
}

VehicleCrew.propTypes = {
  crews: PropTypes.array.isRequired
}