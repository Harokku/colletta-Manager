import React, {Component} from 'react'
import {Sidebar, Segment, Button, Menu, Icon} from 'semantic-ui-react'
import {Link, Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'

import GraphList from '../Graph/GraphsList'


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
          Colletta Manager
        </Segment>

        <Button onClick={this.toggleVisibility}><Icon name='list layout'/> Menu</Button>

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='dashboard'>
              <Link to='/'>
                <Icon name='dashboard'/>
                DashBoard
              </Link>
            </Menu.Item>
            <Menu.Item name='graphs'>
              <Link to=''>
                <Icon name='bar chart'/>
                Grafici
              </Link>
            </Menu.Item>
            <Menu.Item name='supermarkets'>
              <Link to=''>
                <Icon name='shop'/>
                SuperMarkets
              </Link>
            </Menu.Item>
            <Menu.Item name='fleet'>
              <Link to=''>
                <Icon name='truck'/>
                Flotta
              </Link>
            </Menu.Item>
            <Menu.Item name='users'>
              <Link to=''>
                <Icon name='users'/>
                Personale
              </Link>
            </Menu.Item>
            <Menu.Item name='map'>
              <Link to=''>
                <Icon name='map'/>
                Mappa
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Switch>
                <Route exact path='/' component={GraphList}/>
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default withRouter(MainContainer)