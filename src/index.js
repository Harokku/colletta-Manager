import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'


const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj89ot70n053c0122icvpl52q'
});

const client = new ApolloClient({
  networkInterface
});


ReactDOM.render(
 <BrowserRouter>
   <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
 </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
