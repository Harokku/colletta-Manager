import React from 'react'
import { Header, Segment } from 'semantic-ui-react'


export default function Dashboard(props) {
  return (
    <div>
      <Header as='h2' attached='top'>Segnaposto Dashboard</Header>
      <Segment attached color='teal'>
        Verra' vissualizzato un riassunto della situazione con stato carico mezzi,
        totale caricato e altre informazioni utili.
      </Segment>
    </div>
  )
}