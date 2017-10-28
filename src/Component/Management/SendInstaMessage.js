import React, {Component} from 'react'
import {Dropdown, Input} from 'semantic-ui-react'
import {graphql, gql, compose} from 'react-apollo'

class SendInstaMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      value: '',
      messageToSend: '',
    }
  }

  handleChange = (e, {value}) => {
    this.setState({
      value
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
    await this.props.mutate({
      variables: {
        vehicleId: this.state.value,
        message: this.state.messageToSend,
      }
    })
      .then(
        this.setState({
          value: '',
          messageToSend: '',
        })
      )
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