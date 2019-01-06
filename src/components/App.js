import React, { Component } from 'react'
import logo from '../public/logo.svg'
import client from '../apollo/client'
import { ApolloProvider, Query, Mutation } from 'react-apollo'
import '../public/styles/App.scss'

import { LOGIN } from '../apollo/templates/Mutations'
import { USERS, EVENTS } from '../apollo/templates/Queries'

//TESTING A MUTATION - WORKS
/* const signup = gql`
  mutation {
    login(data: { email: "riesen.bla@web.de", password: "123456789" }) {
      token
    }
  }
`
 */

//NOTE: LOGIN mit input variablen (TODO: benutzen von Mutation react-apollo Components wäre cooler)

/* client
  .mutate({
    mutation: LOGIN,
    variables: {
      data:{
        email: "riesen.bla@web.de",
        password: "123456789"
      }
    }
  })
  .then(result => {
    sessionStorage.setItem('token', result.data.login.token)
    console.log(sessionStorage.getItem('token'));
  }) */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Query query={EVENTS}>
                {({ loading, error, data }) => {
                  if (loading) return `loading...`
                  if (error) return `Error! ${error.message}`

                  const { events } = data
                  return events.map(event => (
                    <h1 key={event.id}>{event.title}</h1>
                  ))
                }}
              </Query>
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
