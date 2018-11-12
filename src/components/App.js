import '@babel/polyfill/noConflict'
import React, { Component } from "react"
import logo from "../public/logo.svg"
import "../public/styles/App.scss"
import client from "../apollo/client"
import { gql } from 'apollo-boost'
import { ApolloProvider } from "react-apollo"

//TESTING A MUTATION - WORKS
/* const signup = gql`
  mutation {
    login(data: { email: "riesen.bla@web.de", password: "123456789" }) {
      token
    }
  }
`

client
  .mutate({
    mutation: signup
  })
  .then(result => {
    sessionStorage.setItem('token', result.data.login.token)
  }) */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
