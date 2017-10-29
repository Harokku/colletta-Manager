import React, {Component} from 'react'
import {Dropdown, Input} from 'semantic-ui-react'
import {graphql, gql, compose} from 'react-apollo'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class SendInstaMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      value: '',
      selectedVehicle: '',
      messageToSend: '',
    }
  }

  handleChange = (e, {value}) => {
    const vehicleRadioCode = this.props.data.allVehicles.find(vehicle => vehicle.id === value)
    this.setState({
      value,
      selectedVehicle: vehicleRadioCode.radioCode,
    })
  };
  handleSearchChange = (e, {searchQuery}) => {
    this.setState({
      searchQuery
    })
  };

  handleClick = async (e) => {
    e.preventDefault();
    console.log('Sending message')
    try {
      await this.props.mutate({
        variables: {
          vehicleId: this.state.value,
          message: this.state.messageToSend,
        }
      });
      this.setState({
        value: '',
        messageToSend: '',
      });
      toast.success('Messaggio per ' + this.state.selectedVehicle + ' inviato')
    }
    catch(error){
      toast.error('Messaggio per ' + this.state.selectedVehicle + ' NON inviato')
    }
  };

  handleInputChange = (e) => {
    this.setState({
      messageToSend: e.target.value,
    })
  }

  enableSend = () => {
    return !(this.state.value !== null && this.state.messageToSend !== '')
  };

  render() {
    const {value} = this.state;

    if (this.props.data && this.props.data.loading) {
      return (
        <div>Waiting data...</div>
      )
    }

    const vehicles = this.props.data.allVehicles.map(vehicle => {
      return {key: vehicle.id, text: vehicle.radioCode, value: vehicle.id}
    });

    return (
      <div>
        <ToastContainer
          position='bottom-center'
          autoclose={500}
          newestOnTop={true}
          closeOnClick
        />
        <Dropdown
          selection
          search
          options={vehicles}
          placeholder='Seleziona un Veicolo'
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
          value={value}
        />
        <Input action={{disabled: this.enableSend(), color: 'teal', content: 'Invia', onClick: this.handleClick}}
               placeholder='Scrivi messaggio'
               value={this.state.messageToSend}
               onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

const VEHICLES_FOR_SEARCH = gql`
    query getSearchVehicle {
        allVehicles (
            orderBy: radioCode_ASC
        ) {
            id
            radioCode
        }
    }

`
const SEND_MESSAGE = gql`
    mutation sendMessage (
    $vehicleId: ID!
    $message: String!
    ) {
        createInstaMessage (
            vehicleId: $vehicleId
            message: $message
        ){
            id
            message
        }
    }
`

export default compose(
  graphql(VEHICLES_FOR_SEARCH),
  graphql(SEND_MESSAGE)
)(SendInstaMessage)