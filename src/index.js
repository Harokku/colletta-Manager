import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import {BrowserRouter} from 'react-router-dom'

const GRAPHQL_ENDPOINT = 'wss://subscriptions.graph.cool/v1/cj89ot70n053c0122icvpl52q';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj89ot70n053c0122icvpl52q'
});

const wsClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
