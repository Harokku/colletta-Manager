import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {List, Image, Icon} from 'semantic-ui-react'

export default class CrewListItem extends Component {

  handleClickEvent = () => {
    this.props.onItemClick(this.props.id)
  }

  render() {
    return (
      <List.Item className='crewFull' active={this.props.selectedId === this.props.id} onClick={this.handleClickEvent}>
        <Image avatar>
          <Icon size='large' name={this.props.icon.toLowerCase()}/>
        </Image>
        <List.Content>{this.props.radioCode}</List.Content>
      </List.Item>
    )
  }
}

CrewListItem.propTypes = {
  id: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
  icon: PropTypes.string.isRequired,
  radioCode: PropTypes.string.isRequired,
}

