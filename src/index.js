import '@babel/polyfill/noConflict'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Login from './components/Login'
import Register from './components/Register'
import ProjectView from './components/ProjectView'
import {
  BrowserRouter,
  Route,
  IndexRoute,
  hashHistory,
  Switch
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { ApolloProvider } from "react-apollo"
import client from './apollo/client';
import './public/styles/index.css'

ReactDOM.render(
  <div>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Events" component={App} />
          <Route path="/Register" component={Register} />
          <Route path="/Projects" component={ProjectView} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
