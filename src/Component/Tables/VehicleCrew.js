import React from 'react'
import {Card, Icon, Button, List, Label} from 'semantic-ui-react'

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
          {props.crew ? listCrew(props.crew) : ''}
      </Card.Content>
    </Card>
  )
}

function listCrew(crew) {
  return crew.map((item, index) => {
      return (
        <List key={index}>
          <Label color={ribbonColor(item.role)} ribbon>{item.role}</Label>
          <List.Item>Nome: {item.surname + ' ' + item.name}</List.Item>
          <List.Item>Nome: {item.phone}</List.Item>
        </List>
      )
  })
}

function ribbonColor(role) {
  if (role === 'COORDINAMENTO'){
    return 'red'
  } else if (role === 'AUTISTA'){
    return 'green'
  } else if (role === 'NAVIGATORE'){
    return 'blue'
  } else if (role === 'OPMARKET'){
    return 'brown'
  } else {
    return 'black'
  }
}

export default function VehicleCrew(props) {
    return (
      <Card.Group>
        {listCard(props)}
      </Card.Group>
    )
}