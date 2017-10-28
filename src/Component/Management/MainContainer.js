import React, {Component} from 'react'
import {Sidebar, Segment, Button, Menu, Icon, Popup} from 'semantic-ui-react'
import {Link, Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'

import './MainContainer.css'

import GraphList from '../Graph/GraphsList'
import Dashboard from './Dashboard'
import VehicleTable from '../Tables/VehicleTable'
import MapContainer from '../Map/MapContainer'
import CrewList from '../Crew/CrewList'
import MarketList from '../Markets/MarketList'
import SendInstaMessage from './SendInstaMessage'

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render() {
    const {visible} = this.state;

    return (
      <div>
        <Segment tertiary>
          <Button animated onClick={this.toggleVisibility}><Icon circular color='brown' name='list layout' /> Colletta Management Console </Button>
          <Popup
          trigger={<Button color='brown' content='Invia messaggio' float='right'/>}
          on='click'
          position='bottom center'>
            <SendInstaMessage/>
          </Popup>
        </Segment>

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='dashboard'>
              <Link to='/'>
                <Icon name='dashboard'/>
                DashBoard
              </Link>
            </Menu.Item>
            <Menu.Item name='graphs'>
              <Link to='/graphs'>
                <Icon name='bar chart'/>
                Grafici
              </Link>
            </Menu.Item>
            <Menu.Item name='supermarkets'>
              <Link to='/markets'>
                <Icon name='shop'/>
                SuperMarkets
              </Link>
            </Menu.Item>
            <Menu.Item name='fleet'>
              <Link to='/vehicles'>
                <Icon name='truck'/>
                Flotta
              </Link>
            </Menu.Item>
            <Menu.Item name='crew'>
              <Link to='/crew'>
                <Icon name='users'/>
                Personale
              </Link>
            </Menu.Item>
            <Menu.Item name='map'>
              <Link to='/map'>
                <Icon name='map'/>
                Mappa
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/graphs' component={GraphList}/>
                <Route exact path='/markets' component={MarketList}/>
                <Route exact path='/vehicles' component={VehicleTable}/>
                <Route exact path='/crew' component={CrewList}/>
                <Route exact path='/map' component={MapContainer}/>
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default withRouter(MainContainer)