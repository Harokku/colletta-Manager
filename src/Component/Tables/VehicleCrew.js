import React from 'react'
import PropTypes from 'prop-types'
import {Card, Icon, Button, List, Label, Divider} from 'semantic-ui-react'

import ribbonColor from '../Functions/RibbonColor'

function listCard(props) {
  return (
    <Card>
      <Card.Content>
        <Button floated='left' size='mini' icon onClick={(e) => props.onCloseClicked()}><Icon name='close'/></Button>
        <Card.Header>
          Equipaggio
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {props.crews.length > 0 ? listCrew(props.crews) : ''}
      </Card.Content>
    </Card>
  )
}

function listCrew(crews) {
  return crews.map((item, index) => {
    return (
      <List key={index}>
        <Label>{item.shift}</Label>
        <Divider/>
        {item.personnels.map((personnel, index) => {
          return (
            <div key={index}>
              <Label color={ribbonColor(personnel.role)} ribbon>{personnel.role}</Label>
              <List.Item>Nome: {personnel.surname + ' ' + personnel.name}</List.Item>
              <List.Item>Nome: {personnel.phone}</List.Item>
            </div>
          )
        })}
      </List>
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