import React, {Component} from 'react'
import {graphql, gql} from 'react-apollo'
import {Header, Form, Input, Button} from 'semantic-ui-react'

class VehicleFormNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioCode: '',
      manufacturer: '',
      model: '',
      tmfl: '',
      tare: '',
      isFormFilled: false,
    }
  }

  /*handleChange = (e, {name, value}) => {
    this.props.onFormDataChange(e, name, value)
  }*/

  // TODO: Implement data guards
  handleChange = (e, {name, value}) => {
    let convertedValue = ''
    if (name === 'tmfl' || name === 'tare') {
      if (isNaN(parseFloat(value))) {
        convertedValue = ''
      } else {
        convertedValue = parseFloat(value)
      }
    } else {
      convertedValue = value.toUpperCase()
    }
    this.setState({
      [name]: convertedValue,
    }, this.checkFormValidity)
  }

  checkFormValidity = () => {
    const {radioCode, manufacturer, model, tmfl, tare} = this.state
    if (![radioCode, manufacturer, model, tmfl, tare].some(el => el === '')) {
      this.setState({
        isFormFilled: true,
      })
    } else {
      this.setState({
        isFormFilled: false,
      })
    }
  }

  // TODO: Implement error handling
  createVehicle = async () => {
    const {radioCode, manufacturer, model, tmfl, tare} = this.state;
    if (![radioCode, manufacturer, model, tmfl, tare].some(el => el === '')) {
      await this.props.mutate({
        variables: {
          radioCode,
          manufacturer,
          model,
          tmfl,
          tare,
          actualDateTime: new Date(),
        }
      })
        .then(this.setState({
          radioCode: '',
          manufacturer: '',
          model: '',
          tmfl: '',
          tare: '',
        }))
    } else {
      this.setState({
        isFormFilled: false
      })
    }
  };

  render() {
    return (
      <div>
        <Header as='h3' color='brown' block>
          <Button disabled={!this.state.isFormFilled} label='Aggiungi nuovo mezzo' icon='add' labelPosition='left' onClick={this.createVehicle}/>
        </Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field inline control={Input} label='Codice Radio:' placeholder='Codice Radio' name='radioCode'
                        value={this.state.radioCode} onChange={this.handleChange}/>
            <Form.Field inline control={Input} label='Marca:' placeholder='Marca' name='manufacturer'
                        value={this.state.manufacturer} onChange={this.handleChange}/>
            <Form.Field inline control={Input} label='Modello:' placeholder='Modello' name='model'
                        value={this.state.model} onChange={this.handleChange}/>
            <Form.Field inline control={Input} label='M.C.P.C.:' placeholder='M.C.P.C.' name='tmfl'
                        value={this.state.tmfl} onChange={this.handleChange}/>
            <Form.Field inline control={Input} label='Tara:' placeholder='Tara' name='tare'
                        value={this.state.tare} onChange={this.handleChange}/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const ADD_VEHICLE_MUTATION = gql`
    mutation addNewVehicle(
    $radioCode: String!
    $manufacturer: String!
    $model: String!
    $tmfl: Float!
    $tare: Float!
    ){
        createVehicle (
            radioCode: $radioCode
            manufacturer: $manufacturer
            model: $model
            tmfl: $tmfl
            tare: $tare
            actualLoad: 0
            latitude: 45.83341
            longitude: 8.80055
            collects: {
                tripNumber: 1
                loadedQty: 0
                supermarketId: "cj916fo3w4oxa018137w05hh3"
            }
        ){
            id
            radioCode
            manufacturer
            model
            tmfl
            tare
        }
    }
`

export default graphql(ADD_VEHICLE_MUTATION, {options: {refetchQueries: ['getAllVehicles']}})(VehicleFormNew)