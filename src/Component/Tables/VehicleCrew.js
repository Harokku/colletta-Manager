import React from 'react'
import {Card, Icon, Button} from 'semantic-ui-react'

function listCard(crew) {
  console.log(JSON.stringify(crew))
  return (
    <Card>
      <Card.Content>
        <Button floated='left' size='mini' icon onClick={console.log('Close clicked')}><Icon name='close'/></Button>
      </Card.Content>
    </Card>
  )
}

export default function VehicleCrew(props) {
    return (
      <Card.Group>
        {listCard(props.crew)}
      </Card.Group>
    )
}