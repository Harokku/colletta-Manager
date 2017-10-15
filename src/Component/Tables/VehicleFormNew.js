import React, {Component} from 'react'
import {Header, Form, Input, Button} from 'semantic-ui-react'


export default class VehicleFormNew extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => {
    this.props.onFormDataChange(e, name, value)
  }

  render() {
    return (
      <div>
        <Header as='h3' color='brown' block>
          Inserisci nuovo Mezzo
        </Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field inline control={Input} label='Codice Radio:' placeholder='Codice Radio' name='radioCode' value={this.props.formData.radioCode} onChange={this.handleChange}/>
            <Form.Field inline control={Input} label='Marca:' placeholder='Marca' />
            <Form.Field inline control={Input} label='Modello:' placeholder='Modello' />
            <Form.Field inline control={Input} label='M.C.P.C.:' placeholder='M.C.P.C.' />
            <Form.Field inline control={Input} label='Tara:' placeholder='Tara' />
          </Form.Group>
        </Form>
      </div>
    )
  }
}